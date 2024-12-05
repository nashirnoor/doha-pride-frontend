import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { BASE_URL, SOCKET_BASE_URL } from '../../api/Route';

export default function AdminDriverChat({ driverId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [websocket, setWebsocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('access_token');
        
        // Initialize WebSocket connection
        const ws = new W3CWebSocket(`${SOCKET_BASE_URL}/ws/chat/?token=${token}`);
        
        ws.onopen = () => {
            console.log('WebSocket Connected');
            setWebsocket(ws);
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.source === 'chat') {
                setMessages(prev => [...prev, data.message]);
            }
        };

        // Fetch existing messages
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/chatroom/${driverId}/messages/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [driverId]);

    const sendMessage = () => {
        if (newMessage.trim() && websocket) {
            const user = JSON.parse(localStorage.getItem('user'));
            const messageData = {
                source: 'chat',
                driver_id: driverId,
                admin_id: user.id,
                content_type: 'text',
                content: newMessage,
            };
            console.log(messageData,"mess")
            websocket.send(JSON.stringify(messageData));
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            message.sender.id === JSON.parse(localStorage.getItem('user')).id
                                ? 'text-right'
                                : 'text-left'
                        }`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg ${
                                message.sender.id === JSON.parse(localStorage.getItem('user')).id
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}