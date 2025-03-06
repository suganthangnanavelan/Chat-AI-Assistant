import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";
import { FaPaperPlane } from "react-icons/fa";

const ChatbotPage = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);
    setUserMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userMessage,
      });
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div className="container">
      <div className="chat-container">
        <div className="header">
          <h1 className="heading">Chat Assistant</h1>
          <div className="separator"></div>
        </div>
        <ul ref={messageListRef} className="message-list">
          {chatMessages.map((message, index) => (
            <li
              key={index}
              className={message.sender === "user" ? "user-message" : "bot-message"}
            >
              {message.text}
            </li>
          ))}
        </ul>
        <form className="chat-form" onSubmit={handleSendMessage}>
          <input
            className="message-input"
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="send-button">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
