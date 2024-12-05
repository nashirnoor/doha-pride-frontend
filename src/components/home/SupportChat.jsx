// components/SupportChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { SOCKET_BASE_URL } from '../../api/Route';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket(`${SOCKET_BASE_URL}/ws/chat/`);
    
    websocket.onopen = () => {
      console.log('Connected to chat');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.source === 'support_chat') {
        setMessages(prev => [...prev, data.message]);
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      source: 'support_chat',
      content: message,
      content_type: 'text',
    };

    ws.send(JSON.stringify(messageData));
    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
          </svg>
        </button>
      ) : (
        <div className="w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Support Chat</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto" ref={chatRef}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 ${msg.sender.user_type === 'admin' ? 'text-left' : 'text-right'}`}
              >
                <div className={`inline-block p-3 rounded-lg ${
                  msg.sender.user_type === 'admin' 
                    ? 'bg-gray-100' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SupportChat;