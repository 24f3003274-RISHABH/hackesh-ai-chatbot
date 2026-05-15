const axios = require("axios");
const Chat = require("../models/Chat");

const callGeminiAI = async (message) => {
  const prompt = `
You are Hackesh AI ChatBot.

Answer like a smart, modern, student-friendly AI assistant.

Rules:
- Do not give one big paragraph.
- Use short paragraphs.
- Use clean headings.
- Use bullet points where useful.
- Explain step-by-step when needed.
- Keep tone clear, confident, and helpful.
- Avoid robotic or copy-paste style.
- Format answer in Markdown.

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
        title: message.slice(0, 35),
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
    const chats = await Chat.find()
      .select("title createdAt updatedAt")
      .sort({ updatedAt: -1 });

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

const renameChat = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

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
  renameChat,
};