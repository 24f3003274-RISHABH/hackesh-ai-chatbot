const express = require("express");
const {
  sendMessage,
  getChats,
  getSingleChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/message", sendMessage);
router.get("/", getChats);
router.get("/:id", getSingleChat);

module.exports = router;