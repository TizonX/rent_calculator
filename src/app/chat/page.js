"use client";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io(`http://localhost:8080`);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const handleMessageSend = () => {
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-5">
      <div className="bg-gray-200 px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
      </div>

      <div
        className="px-4 py-4"
        id="chatMessages"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user"
                ? "flex justify-end mb-2"
                : "flex justify-start mb-2"
            }
          >
            <div
              className={
                message.sender === "user"
                  ? "bg-blue-500 text-white p-2 rounded-lg max-w-xs"
                  : "bg-gray-300 p-2 rounded-lg max-w-xs"
              }
            >
              {message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-200 px-4 py-2 flex items-center">
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleMessageSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
