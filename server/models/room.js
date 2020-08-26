const mongodb = require("mongodb");

const getDb = require("../util/database.js").getDb;

class Room {
  constructor(name, creator, code, id) {
    this.name = name;
    this.creator = creator;
    this._id = id;
    this.code = code || "";
  }

  save() {
    const db = getDb();
    return db
      .collection("rooms")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update() {
    const db = getDb();
    return db
      .collection("rooms")
      .updateOne({ _id: new mongodb.ObjectId(this._id) }, {$set: {code: this.code}})
      .then((result) => {})
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("rooms")
      .find()
      .toArray()
      .then((rooms) => {
        // console.log(rooms);
        return rooms;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchById(roomId) {
    const db = getDb();
    return db
      .collection("rooms")
      .find({ _id: mongodb.ObjectId(roomId) })
      .next()
      .then((room) => {
        // console.log(room);
        return room;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Room;
