import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I am Hackesh AI ChatBot. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chats/message`,
        {
          message: currentInput,
          chatId,
        }
      );

      setChatId(res.data.chatId);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply,
        },
      ]);
    } catch (error) {
      console.log("Frontend error:", error);

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

          <button
            onClick={() => {
              setMessages([
                {
                  role: "assistant",
                  text: "New chat started. Ask me anything.",
                },
              ]);
              setChatId(null);
            }}
          >
            + New Chat
          </button>

          <div className="sidebar-info">
            <p>AI Assistant</p>
            <span>Powered by Gemini</span>
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
                  <p>{msg.text}</p>
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