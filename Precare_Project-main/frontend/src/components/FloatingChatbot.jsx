import React, { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I am your Cancer Assistant. Ask me anything." },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer || "No response found" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error. Please try again." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">

      {/* CHAT WINDOW */}
      {open && (
        <div className="w-80 h-[420px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="bg-purple-600 text-white flex justify-between items-center px-3 py-2">
            <h2 className="text-sm font-semibold">Cancer Chatbot</h2>
            <button onClick={() => setOpen(false)}>
              <FiX />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-purple-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-gray-500">Thinking...</div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="flex border-t p-2 gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask your question..."
              className="flex-1 border rounded-lg px-2 py-1 text-sm outline-none"
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-3 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
        >
          <FiMessageCircle size={22} />
        </button>
      )}
    </div>
  );
}

export default FloatingChatbot;