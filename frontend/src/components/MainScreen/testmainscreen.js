import React, { useEffect, useState } from "react";

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat/");
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        return () => ws.close();
    }, []);

    const sendMessage = (message) => {
        if (socket) {
            socket.send(JSON.stringify({ message }));
        }
    };

    return (
        <div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage(e.target.value);
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
};

export default Chat;
