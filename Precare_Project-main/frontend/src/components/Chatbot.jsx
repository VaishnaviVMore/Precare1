import React, { useState } from "react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "No answer found.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to chatbot server.",
        },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#0d6efd" }}>
        🩺 Cancer Guidance Chatbot
      </h2>

      <div
        style={{
          height: "450px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          background: "#f8f9fa",
          marginBottom: "15px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "gray" }}>
            Ask anything about cancer treatment, symptoms, prevention or cost.
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  msg.sender === "user" ? "#0d6efd" : "#e9ecef",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "75%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <div style={{ color: "gray" }}>
            🤖 Thinking...
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask your question..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;