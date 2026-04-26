import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isImage = (url) => {
    return url && url.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;
  };

  return (
    <div className="chat-box">
      {messages.map((msg, idx) => (
        <div key={msg._id || idx} className="message-wrapper">
          <div className="message-bubble incoming">
            {msg.message && <div className="message-text">{msg.message}</div>}
            
            {msg.fileUrl && (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="file-attachment">
                {isImage(msg.fileUrl) ? (
                  <img src={msg.fileUrl} alt="attachment" />
                ) : (
                  <span>📎 View Document</span>
                )}
              </a>
            )}
            
            <div className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
            </div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatBox;
