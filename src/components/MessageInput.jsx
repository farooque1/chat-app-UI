import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    
    onSendMessage(text, file);
    setText('');
    setFile(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {file && (
        <div className="file-preview">
          <span>{file.name}</span>
          <button type="button" className="btn-remove" onClick={() => setFile(null)}>×</button>
        </div>
      )}
      <form className="input-container" onSubmit={handleSubmit}>
        <button 
          type="button" 
          className="btn-upload" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload Document"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input 
          type="text" 
          className="input-field" 
          placeholder="Type a message..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </>
  );
};

export default MessageInput;
