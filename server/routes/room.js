const express = require("express");

const roomController = require("../controllers/room.js");

const router = express.Router();

router.post("/add", roomController.postRoom);
router.post("/update", roomController.updateRoom);
router.get("/rooms", roomController.getRooms);
router.get("/fetch", roomController.getRoom);

module.exports = router;
