const axios = require("axios");
const Chat = require("../models/Chat");

const callGeminiAI = async (message) => {
  const prompt = `
You are Hackesh AI ChatBot, a helpful and intelligent assistant.

Answer clearly, professionally, and practically.

User message:
${message}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};

const sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);
    }

    if (!chat) {
      chat = await Chat.create({
        title: message.slice(0, 30),
        messages: [],
      });
    }

    chat.messages.push({
      role: "user",
      text: message,
    });

    const aiReply = await callGeminiAI(message);

    chat.messages.push({
      role: "assistant",
      text: aiReply,
    });

    await chat.save();

    res.status(200).json({
      chatId: chat._id,
      reply: aiReply,
      chat,
    });
  } catch (error) {
    console.error("Chat error:", error.response?.data || error.message);

    res.status(500).json({
      message: "AI response failed",
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getChats,
  getSingleChat,
};