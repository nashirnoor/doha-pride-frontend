// components/AdminChatDashboard.jsx
import React, { useState, useEffect } from 'react';

const AdminChatDashboard = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://your-domain/ws/chat/');
    
    websocket.onopen = () => {
      console.log('Connected to admin chat');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.source === 'support_chat') {
        // Update chats with new message
        setChats(prev => {
          const chatIndex = prev.findIndex(chat => 
            chat.id === data.message.chat_room_id
          );
          
          if (chatIndex === -1) {
            return [...prev, {
              id: data.message.chat_room_id,
              messages: [data.message]
            }];
          }

          const newChats = [...prev];
          newChats[chatIndex].messages.push(data.message);
          return newChats;
        });
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const messageData = {
      source: 'support_chat',
      content: message,
      content_type: 'text',
      chat_room_id: selectedChat.id
    };

    ws.send(JSON.stringify(messageData));
    setMessage('');
  };

  return (
    <div className="flex h-screen">
      {/* Chat list */}
      <div className="w-1/4 border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Support Chats</h2>
        </div>
        <div className="overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedChat?.id === chat.id ? 'bg-gray-100' : ''
              }`}
            >
              <p className="font-medium">Guest User</p>
              <p className="text-sm text-gray-500 truncate">
                {chat.messages[chat.messages.length - 1]?.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-semibold">Chat with Guest User</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedChat.messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`mb-4 ${msg.sender.user_type === 'admin' ? 'text-right' : 'text-left'}`}
                >
                  <div className={`inline-block p-3 rounded-lg ${
                    msg.sender.user_type === 'admin' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatDashboard;