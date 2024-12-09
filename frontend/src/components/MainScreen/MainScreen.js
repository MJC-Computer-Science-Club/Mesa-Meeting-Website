import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

export default function MainScreen() {

    const navigate = useNavigate();
    const [hubs, setHubs] = useState([]);

    const fetchUserHubs = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/gethubs/', { // Replace with your actual API endpoint
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken"),
                    'Authorization': `Token ${Cookies.get("token")}` // Assuming you store the token in localStorage
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching user hubs 1: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data)
            setHubs(data);
        } catch (error) {
            console.error('Error fetching user hubs:', error);
        }
    };

    useEffect(() => {
        console.log("Hello");
        if (Cookies.get("username") === undefined) {
            console.log("Navigate");
            navigate('/homepage');
        }
        fetchUserHubs();

    }, [navigate]);


    return (
        <div>
            {/* Check if username cookie exists */}
            {Cookies.get("username") !== undefined && (
                <>
                    {/* Render hubs if cookie exists */}
                    {hubs.map(hub => (
                        <h1 key={hub.id}>{hub.hub}</h1>
                    ))}
                </>
            )}
        </div>)
}
