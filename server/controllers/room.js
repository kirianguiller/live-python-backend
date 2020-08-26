const Room = require("../models/room.js");
const realTimeRoomInfo = require("../util/realTimeRoomInfo.js");

exports.getRooms = (req, res, next) => {
  Room.fetchAll()
    .then((rooms) => {
      res.status(200).json({ rooms: rooms });
      next();
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.postRoom = (req, res, next) => {
  const name = req.body.room.name;
  const creator = req.body.room.creator;
  const code = req.body.room.code || "";
  const room = new Room(name, creator, code);
  if (name) {
    room.save().then(() => {
      res.status(201).json({
        message: "room successfully created",
        room: room,
      });
      next();
    });
  } else {
    res.status(404).json({
      message: "error : we didn't receive any `room` information",
    });
    next();
  }
};

exports.updateRoom = (req, res, next) => {
  // const room = req.body.room;
  const name = req.body.room.name;
  const creator = req.body.room.creator;
  // const id = req.body.room.id || 0;
  const code = req.body.room.code || "";
  const _id = req.body.room._id;
  const room = new Room(name, creator, code, _id);

  if (_id) {
    room.update();
    res.status(202).json({ message: "you succeeded to update the room data" });
    next();
  } else {
    res.status(402).json({ message: "no id was provided" });
    next();
  }
};

exports.getRoom = (req, res, next) => {
  const roomId = req.query.id;
  Room.fetchById(roomId)
    .then((room) => {
      // console.log("KK fetched the room", roomId);
      // console.log(
      //   "KK realTimeRoomInfo",
      //   realTimeRoomInfo.getCodeById(room._id)
      // );
      const roomCurrentCode = realTimeRoomInfo.getCodeById(room._id)
      if (roomCurrentCode) {
        room.code = roomCurrentCode
      }
      res.status(200).json({ room: room });
      next();
    })
    .catch((err) => console.log(err));
};
