import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import "./index.css";

const socket = io("https://chat-app-backend-nhmx.onrender.com/");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages from API
    axios
      .get("https://chat-app-backend-nhmx.onrender.com//api/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Failed fetching messages", err));

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleSendMessage = async (text, file) => {
    let fileUrl = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post(
          "https://chat-app-backend-nhmx.onrender.com//api/upload",
          formData,
        );
        fileUrl = res.data.fileUrl;
      } catch (err) {
        console.error("Upload failed", err);
        alert("File upload failed!");
        return;
      }
    }

    if (text || fileUrl) {
      socket.emit("sendMessage", { message: text, fileUrl });
    }
  };

  return (
    <div className="app-container">
      <div className="header">Modern Chat</div>
      <ChatBox messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
