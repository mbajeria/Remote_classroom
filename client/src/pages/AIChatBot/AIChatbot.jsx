import React, { useEffect, useRef, useState } from "react";
import "./AIChatbot.css";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 💤 I'm Finch, and I'll be your guide to Sendbird today.",
      sender: "bot",
      time: "5:55 PM",
    },
    {
      id: 2,
      text: "What interests you about customer communications?",
      sender: "bot",
      time: "5:56 PM",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "An AI chatbot to suggest products, generate leads, or handle customer inquiries",
    "Omnichannel business messaging",
    "Secure and scalable in-app chat",
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botReplies = [
        "Great choice! Which industry are you in?",
        "I understand. Our platform offers robust solutions for that!",
        "That's a common challenge many businesses face.",
        "Thanks for sharing. We can help with that!",
        "Excellent! Our solution would be perfect for your needs.",
      ];
      const botMsg = {
        id: Date.now() + 1,
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  const handleQuickReply = (reply) => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: reply, sender: "user", time: now },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Great choice! How can I assist you further with this?",
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="ai-chatbot">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)} aria-label="Open chat">
          <div className="chat-icon-container">
            <img
              src="/ChatICON.gif" /* put file inside /public */
              alt="Chat"
              className="chat-icon-img"
            />
          </div>
        </button>
      )}

      {/* Fullscreen Chat Window */}
      {isOpen && (
        <div className="chat-window" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="chat-header">
            <div className="header-left">
              <div className="avatar">
                <span className="avatar-icon">🤖</span>
              </div>
              <div className="header-info">
                <h3>GyaanSetu</h3>
                <p>Online • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>

            <div className="header-actions">
              <button
                className="action-btn close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((m) => (
              <div key={m.id} className={`message ${m.sender === "user" ? "user-message" : "bot-message"}`}>
                <div className="message-bubble">
                  <p>{m.text}</p>
                  <span className="message-time">{m.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies (only at start) */}
          {messages.length <= 2 && (
            <div className="quick-replies">
              <p className="quick-replies-title">Quick options:</p>
              <div className="quick-replies-container">
                {quickReplies.map((r, i) => (
                  <button key={i} className="quick-reply-btn" onClick={() => handleQuickReply(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Type your message here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="message-input"
              />
              <button className="send-btn" onClick={handleSendMessage} disabled={!inputText.trim()}>
                ➤
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <p>
              Powered by <strong>GyanSetu</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
