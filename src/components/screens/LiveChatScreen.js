import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectChat, sendMessage } from '../actions/chatActions';

const LiveChatScreen = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const { connected, messages, error } = chat;

  useEffect(() => {
    dispatch(connectChat());
  }, [dispatch]);

  const handleSendMessage = () => { 
    if (message.trim() !== '') {
      dispatch(sendMessage(message));
      setMessage('');
    }
  };
  

  return (
    <div className="live-chat-container">
      {connected ? (
        <div>
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg.content}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LiveChatScreen;
