import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, Send, X } from 'react-feather';
import { BASE_URL } from '../api/Route';

const Chat = ({ driverId, driverName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const userId = parseInt(localStorage.getItem('userId'));

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        `${BASE_URL}chat/?partner_id=${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  // Check unread messages
  const checkUnreadMessages = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.get(
        `${BASE_URL}unread-messages/?partner_id=${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUnreadCount(response.data.unread_count);
    } catch (error) {
      console.error('Error checking unread messages', error);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
  
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post(
        `${BASE_URL}chat/`,
        {
          receiver: driverId,  // Ensure this is explicitly sent
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      // Clear input and refresh messages
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message', error);
      // Optionally show error to user
      alert(error.response?.data?.error || 'Failed to send message');
    }
  };

  // Polling setup
  useEffect(() => {
    // Initial fetch
    fetchMessages();
    checkUnreadMessages();

    // Set up polling
    const messageInterval = setInterval(fetchMessages, 5000);
    const unreadInterval = setInterval(checkUnreadMessages, 10000);

    // Cleanup intervals
    return () => {
      clearInterval(messageInterval);
      clearInterval(unreadInterval);
    };
  }, [driverId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      {/* Chat Header */}
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-blue-600" size={24} />
          <h2 className="text-lg font-semibold">{driverName}</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${
              msg.sender.id === userId 
                ? 'justify-end' 
                : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender.id === userId 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.message}
              <div className="text-xs opacity-70 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-100 p-4 flex items-center gap-3">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-lg"
        />
        <button 
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;