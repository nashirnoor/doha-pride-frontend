import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({ driverId, driverName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const currentUserId = localStorage.getItem('userId');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchChatHistory = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`https://doha-pride-backend-2.onrender.com/chat-rooms/${driverId}/messages/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            
            const data = await response.json();
            console.log(data,"asdfsd")
            const transformedMessages = data.map(message => ({
                ...message,
                sender: {
                    ...message.sender,
                    id: message.sender.id.toString() 
                }
            }));
            setMessages(transformedMessages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChatHistory();
        const token = localStorage.getItem('access_token');
        const ws = new WebSocket(`wss://doha-pride-backend-2.onrender.com/ws/chat/?token=${token}`);

        ws.onopen = () => {
            console.log('WebSocket Connected');
            const connectionMessage = {
                source: 'chat',
                driver_id: driverId,
                customer_id: currentUserId,
                type: 'connection'
            };
            ws.send(JSON.stringify(connectionMessage));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.source === 'chat' && data.message) {
                const newMessage = {
                    ...data.message,
                    sender: {
                        ...data.message.sender,
                        id: data.message.sender.id.toString()
                    }
                };
                setMessages(prev => [...prev, newMessage]);
                scrollToBottom();
            }
        };

        setSocket(ws);
        return () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [driverId, currentUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (newMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
            const messageData = {
                source: 'chat',
                driver_id: driverId,
                customer_id: currentUserId,
                content: newMessage,
                content_type: 'text',
                isReply: false
            };
            const localMessage = {
                content: newMessage,
                created_at: new Date().toISOString(),
                sender: {
                    id: currentUserId.toString() 
                }
            };
            setMessages(prev => [...prev, localMessage]);
            socket.send(JSON.stringify(messageData));
            setNewMessage('');
            scrollToBottom();
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed right-0 bottom-0 w-96 h-[600px] bg-white shadow-lg rounded-t-lg flex flex-col">
            <div className="p-4 border-b bg-gray-100 flex justify-between items-center">
                <h3 className="font-bold">{driverName}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    messages.map((message, index) => {
                        const isCurrentUser = message.sender.id === currentUserId;
                        return (
                            <div
                                key={index}
                                className={`mb-4 ${isCurrentUser ? 'text-right' : 'text-left'}`}
                            >
                                <div 
                                    className={`inline-block p-3 rounded-lg max-w-[70%] break-words ${
                                        isCurrentUser 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-200'
                                    }`}
                                >
                                    {message.content}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {formatTime(message.created_at)}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 border rounded-l-lg p-2"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;