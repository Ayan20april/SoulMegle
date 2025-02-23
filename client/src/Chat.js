import React, { useState } from "react";

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: user.username, text: input }]);
    setInput("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "200px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
