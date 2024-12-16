import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef } from "react";
import Defaultnavbar from '../Defaultnavbar';

export default function MainScreen() {

    const navigate = useNavigate();
    const [hubs, setHubs] = useState([]);
    const [currentHubName, setCurrentHubName] = useState("")
    const [messages, setMessages] = useState([]);
    const [tempMessage, setTempMessage] = useState("");
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState([])

    const wsRef = useRef(null);

    let url = `ws://127.0.0.1:8000/ws/channel/${encodeURIComponent("1")}/`; // Updated to include channel


    const handleSendMessage = () => {

        if (tempMessage.trim()) {
            setMessage("");
        }
    };

    const handleChannelClick = (channel) => {
        // url = `ws://127.0.0.1:8000/ws/channel/1/`; // Updated to include channel
        setCurrentChannel(channel["id"]);
        url = `ws://127.0.0.1:8000/ws/channel/${encodeURIComponent(channel["id"])}/`;
        console.log(`Navigated to: ${channel["name"]}`);
        wsRef.current.close()
        fetchSpecificChannelHub(channel["id"]);
      };

    function removeHub(inputString) {
        // Split the string by ' '
        const words = inputString.split(' ');

        // Remove the first word (the 'hub' part)
        words.pop();

        // Join the remaining words back into a string
        const result = words.join(' ');

        return result;
    }

    const sendMessage = async (hId) => {
        console.log("Send message ", currentChannel);
        wsRef.current.send(JSON.stringify({
            "channel": currentChannel,
            "content": tempMessage,
            "user": Cookies.get("username"),
            "created_at": "0"
        }))
        setTempMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
            setTempMessage("");
        }
    };

    const fetchUserHubs = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/gethubs/', { // Replace with your actual API endpoint
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken"),
                    'Authorization': `Token ${Cookies.get("token")}`, // Assuming you store the token in localStorage
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching user hubs 1: ${response.statusText}`);
            }

            const data = await response.json();
            // console.log(data)
            setHubs(data);
            fetchSpecificHub(data[0].hub);
        } catch (error) {
            console.error('Error fetching user hubs:', error);
        }
    };

    const fetchSpecificHub = async (hId) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/getspecifichub/', { // Replace with your actual API endpoint
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken"),
                    'Authorization': `Token ${Cookies.get("token")}`, // Assuming you store the token in localStorage
                },
                body: JSON.stringify({ "name": removeHub(hId) })
            });

            if (!response.ok) {
                throw new Error(`Error fetching user hub 1: ${response.statusText}`);
            }

            const data = await response.json();
            // console.log(data);
            setCurrentHubName(data.hub["name"]);
            fetchHubChannels(data.hub["name"]);
            // setMessages(data.messages)
            // console.log(messages)
        } catch (error) {
            console.error('Error fetching user hub:', error);
        }
    };

    const fetchHubChannels = async (hId) => {
        console.log("Channel thing");
        console.log(currentHubName)
        try {
            const response = await fetch('http://127.0.0.1:8000/getHubChannels/', { // Replace with your actual API endpoint
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken"),
                    'Authorization': `Token ${Cookies.get("token")}`, // Assuming you store the token in localStorage
                },
                body: JSON.stringify({ "hub": hId })
            });

            if (!response.ok) {
                throw new Error(`Error fetching channel 1: ${response.statusText}`);
            }

            const data = await response.json();
            setChannels(data);
            setCurrentChannel(data[0].id);
            console.log("My data:", data);
            fetchSpecificChannelHub(data[0].id);
        } catch (error) {
            console.error('Error fetching channel:', error);
        }
    };

    const fetchSpecificChannelHub = async (hId) => {
        console.log(hId);
        try {
            const response = await fetch('http://127.0.0.1:8000/getSpecificChannel/', { // Replace with your actual API endpoint
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken"),
                    'Authorization': `Token ${Cookies.get("token")}`, // Assuming you store the token in localStorage
                },
                body: JSON.stringify({ "id": hId })
            });

            if (!response.ok) {
                throw new Error(`Error fetching specific channel hub 1: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            console.log("CURRENT CHANNEL: ", hId)
            setMessages(data.messages);
        } catch (error) {
            console.error('Error fetching specific channel hub:', error);
        }
    };

    useEffect(() => {
        console.log("Redone", currentChannel);
        if (currentChannel.length !== 0){
            console.log("Nice??");
            url = `ws://127.0.0.1:8000/ws/channel/${encodeURIComponent(currentChannel)}/`;
        }
        const ws = new WebSocket(url, [], {
            headers: {
              Authorization: `Token ${Cookies.get("token")}}`,
            },
          });

        console.log(ws);

        wsRef.current = ws;

        ws.onmessage = function (e) {
            console.log("NEW CURRENT CHANNEL", currentChannel);
            // url = `ws://127.0.0.1:8000/ws/channel/1/`; // Updated to include channel
            let data = JSON.parse(e.data);
            console.log("Data:", data);
            console.log("Current messages: ", messages);
            setMessages((prevMessages) => [data, ...prevMessages]);
            console.log(messages);
        }

        ws.onopen = function () {
            console.log("WebSocket connected to channel:", currentChannel);
        };

        if (Cookies.get("username") === undefined) {
            // console.log("Navigate");
            navigate('/homepage');
        }
        fetchUserHubs();

    }, [navigate]);


    return (
        <div>
            <Defaultnavbar allChannels={channels} onChannelClick={handleChannelClick} /> 
            <div className="hub-content">
                <h1>{currentHubName}</h1>
                <div className="hub-messages">
                    {messages.map((message) => (
                        <div className="message" key={message.id}>
                            <p className="message-user">{message.user}</p>
                            <p className="message-content">{message.content}</p>
                        </div>
                    ))}
                </div>
                <div className="message-bar">
                    <input
                        type="text"
                        className="message-input"
                        placeholder="Type your message here..."
                        value={tempMessage}
                        onChange={(e) => setTempMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="send-button" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
            {/* Check if username cookie exists */}
            {Cookies.get("username") !== undefined && (
                <>
                    {/* Render hubs if cookie exists */}
                    <aside>
                        {hubs.map(hub => (
                            <p onClick={() => fetchSpecificHub(hub.hub)} key={hub.id}>{hub.hub}</p>
                        ))}
                    </aside>
                </>
            )}
        </div>)
}
