const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://webadmin:Bqux3ZegkINFdNX7@cluster0.yachm.mongodb.net/livepython?retryWrites=true&w=majority"
  )
    .then((client) => {
      callback(client);
      _db = client.db();
    })
    .catch((err) => {
      // console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
