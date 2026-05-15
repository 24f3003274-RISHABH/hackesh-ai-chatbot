const express = require("express");
const {
  sendMessage,
  getChats,
  getSingleChat,
  renameChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/message", sendMessage);
router.get("/", getChats);
router.get("/:id", getSingleChat);
router.put("/:id/rename", renameChat);

module.exports = router;