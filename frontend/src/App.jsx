import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I am Hackesh AI ChatBot. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/chats`);
      setChatHistory(res.data);
    } catch (error) {
      console.log("Fetch chat history error:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const startNewChat = () => {
    setChatId(null);
    setMessages([
      {
        role: "assistant",
        text: "New chat started. Ask me anything.",
      },
    ]);
  };

  const openChat = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/chats/${id}`);
      setChatId(res.data._id);
      setMessages(res.data.messages);
    } catch (error) {
      console.log("Open chat error:", error);
    }
  };

const handleRename = async (id) => {
  if (!renameValue.trim()) return;

  try {
    const res = await axios.put(`${API_URL}/api/chats/${id}/rename`, {
      title: renameValue,
    });

    setChatHistory((prev) =>
      prev.map((chat) =>
        chat._id === id ? { ...chat, title: res.data.title } : chat
      )
    );

    setRenameId(null);
    setRenameValue("");
  } catch (error) {
    console.log("Rename error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Rename failed");
  }
};
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chats/message`, {
        message: currentInput,
        chatId,
      });

      setChatId(res.data.chatId);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply,
        },
      ]);

      fetchChats();
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="chat-container">
        <aside className="sidebar">
          <h2>⚡ Hackesh AI</h2>

          <button className="new-chat-btn" onClick={startNewChat}>
            + New Chat
          </button>

          <div className="sidebar-info">
            <p>AI Assistant</p>
            <span>Powered by Gemini</span>
          </div>

          <div className="history-section">
            <h3>Chat History</h3>

            {chatHistory.length === 0 && (
              <p className="empty-history">No chats yet</p>
            )}

            {chatHistory.map((chat) => (
              <div
                key={chat._id}
                className={`history-item ${
                  chatId === chat._id ? "active-chat" : ""
                }`}
              >
                {renameId === chat._id ? (
                  <div className="rename-box">
                    <input
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          handleRename(chat._id);
                        }
                      }}
                      autoFocus
                    />

                    <button
                      type="button"
                      className="rename-save-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(chat._id);
                      }}
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <>
                    <p onClick={() => openChat(chat._id)}>{chat.title}</p>

                    <button
                      className="rename-btn"
                      onClick={() => {
                        setRenameId(chat._id);
                        setRenameValue(chat.title);
                      }}
                    >
                      ✎
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="chat-main">
          <header className="chat-header">
            <div>
              <h1>Hackesh AI ChatBot</h1>
              <p>Ask questions, debug code, brainstorm ideas.</p>
            </div>

            <span className="status">● Online</span>
          </header>

          <section className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-row ${
                  msg.role === "user" ? "user-row" : "assistant-row"
                }`}
              >
                <div className={`message ${msg.role}`}>
                  <span className="role">
                    {msg.role === "user" ? "You" : "Hackesh AI"}
                  </span>

                  <div className="markdown-answer">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row assistant-row">
                <div className="message assistant">
                  <span className="role">Hackesh AI</span>
                  <p className="typing">Thinking...</p>
                </div>
              </div>
            )}
          </section>

          <footer className="input-area">
            <input
              type="text"
              placeholder="Message Hackesh AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;