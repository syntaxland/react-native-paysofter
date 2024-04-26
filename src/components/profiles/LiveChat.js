import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectChat, sendMessage } from '../actions/chatActions';

const LiveChat = () => {
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

export default LiveChat;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { connectChat, sendMessage, receiveMessage } from '../actions/chatActions';
// import MessageList from './MessageList';
// import MessageInput from './MessageInput';

// const LiveChatScreen = () => {
//   const dispatch = useDispatch();
//   const chat = useSelector((state) => state.chat);
//   const { connected, messages, error } = chat;

//   useEffect(() => {
//     // Connect to the WebSocket server when the component mounts
//     dispatch(connectChat());

//     // Cleanup when the component unmounts
//     return () => {
//       // Disconnect from the WebSocket server if needed
//       // Implement disconnectChat action if necessary
//     };
//   }, [dispatch]);

//   const handleSendMessage = (message) => {
//     // Send the message to the WebSocket server
//     dispatch(sendMessage(message));
//   };

//   return (
//     <div>
//       <h1>Live Chat</h1>
//       {error && <div className="error">{error}</div>}
//       {!connected && <div className="info">Connecting...</div>}
//       {connected && <div className="info">Connected</div>}
//       <MessageList messages={messages} />
//       <MessageInput onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default LiveChatScreen;
