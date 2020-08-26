console.log("this first log work")

var express = require("express");
var path = require("path");
// var io = require("socket.io");

var bodyParser = require("body-parser");

// var history = require("connect-history-api-fallback");

const mongoConnect = require("./server/util/database.js").mongoConnect;

const roomRoutes = require("./server/routes/room.js");

var app = express();
var http = require("http").createServer(app);

// var io = require("socket.io")(http);
const io = require("./server/util/socket.js").init(http);

app.use(express.static(path.join(__dirname, "dist")));
// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("dist");
// const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/room", roomRoutes);
// app.use("/test/", (req, res, next) => {
//   res.json({ test: "test" });
//   next();
// });

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
// app.use(
//   history({
//     index: "/dist/index.html",
//   })
// );

app.get(/.*/, (req, res) => {
  if (!req.path.startsWith("/api")) {
    // } else {
    console.log("KK this is a call for the frontend");
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
  }
});

// 2nd call for redirected requests
// app.use(staticFileMiddleware);

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/dist/index.html'));
// });

// app.get('/test', (req, res) => {
//   res.sendFile(__dirname + '/test.html');
// });

// const {addUserToRoom, getRoomById, rooms} = require("./server/util/roomsState")
const {
  userJoin,
  userLeave,
  getCurrentUser,
  getRoomUsers,
} = require("./server/util/usersIO.js");

const realTimeRoomInfo = require("./server/util/realTimeRoomInfo.js");
console.log("this log work")
mongoConnect(() => {
  // const openRoomsInfo = require("./server/utils/realTimeRoomInfo.js")
  // const realTimeRoomInfo = {};
  io.on("connection", (socket) => {
    const userId = socket.id;
    console.log("KK new user connected the socket, userId =", userId);

    // watch for users entering the room
    socket.on("joinRoom", ({ roomId }) => {
      socket.rooms = {};
      socket.join(roomId, (err) => {
        user = userJoin(userId, roomId);
        io.in(roomId).emit("updateAttendees", {
          attendees: getRoomUsers(roomId),
        });
        // socket.to(roomId).emit("userEnter", user);
      });
    });

    // watch for new code
    socket.on("newCode", (data) => {
      realTimeRoomInfo.setCodeById(data.roomId, data.newCode);
      socket.to(data.roomId).broadcast.emit("newCode", data);
    });

    // watch for users leaving the room
    socket.on("leaveRoom", ({ roomId }) => {
      userLeave(userId);
      io.in(roomId).emit("updateAttendees", {
        attendees: getRoomUsers(roomId),
      });
      socket.leave(roomId, (err) => {});
    });

    // watch for users disconnecting the socket
    socket.on("disconnect", () => {
      socket.leaveAll();
      const leavingUser = userLeave(userId);
      try {
        io.in(leavingUser.roomId).emit("updateAttendees", {
          attendees: getRoomUsers(leavingUser.roomId),
        });

      } catch {
        console.log("KK Error : leavingUser was not found")
      }
    });
  });
  const PORT = process.env.PORT || 3123;
  http.listen(PORT, () => {
    console.log("listening on *:", PORT);
  });
  // const server = app.listen(3000, function() {
  //   console.log("Example app listening on port 3000!");
  // });

  // var io = require("socket.io")(server);
});
