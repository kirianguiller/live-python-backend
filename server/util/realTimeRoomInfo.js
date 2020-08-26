let realTimeRoomInfo = {};
let realTimeRoomAttendees = {};

module.exports = {
  getCodeById: (roomId) => {
    return realTimeRoomInfo[roomId];
  },

  setCodeById: (roomId, code) => {
    realTimeRoomInfo[roomId] = code;
  },

  getRoomAttendeesById: (roomId) => {
    return realTimeRoomAttendees[roomId] ? realTimeRoomAttendees[roomId] : 0;
  },

  incrementRoomAttendeesById: (roomId) => {
    // getRoomAttendeesById(roomId);
    console.log(roomId)
    // realTimeRoomAttendees[roomId] = this.getRoomAttendeesById(roomId) + 1
  },

  decrementRoomAttendeesById: (roomId) => {
    // getRoomAttendeesById(roomId);
    realTimeRoomAttendees[roomId] = getRoomAttendeesById(roomId) - 1
  },
};
