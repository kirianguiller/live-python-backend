const users = [];

// User join a room
function userJoin(userId, roomId) {
  const user = { userId, roomId };
  users.push(user);

  return user;
}

// User leave a room
function userLeave(userId) {
  const index = users.findIndex((user) => user.userId === userId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get current user
function getCurrentUser(userId) {
  return users.find((user) => user.userId === userId);
}

// Get users in a room
function getRoomUsers(roomId) {
  return users
    .filter((user) => user.roomId === roomId)
    .map((user) => user.userId);
}

module.exports = { userJoin, userLeave, getCurrentUser, getRoomUsers };