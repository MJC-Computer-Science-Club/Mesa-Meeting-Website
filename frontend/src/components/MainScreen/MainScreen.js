import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

export default function MainScreen() {

    const navigate = useNavigate();
    const [hubs, setHubs] = useState([]);
    const [currentHubName, setCurrentHubName] = useState("")

    function removeHub(inputString) {
        // Split the string by ' '
        const words = inputString.split(' ');
      
        // Remove the first word (the 'hub' part)
        words.pop();
      
        // Join the remaining words back into a string
        const result = words.join(' ');
      
        return result;
      }

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
            console.log(data)
            setHubs(data);
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
            console.log(data);
            setCurrentHubName(data.name[0]["name"]);
            // setHubs(data);
        } catch (error) {
            console.error('Error fetching user hub:', error);
        }
    };

    useEffect(() => {
        if (Cookies.get("username") === undefined) {
            console.log("Navigate");
            navigate('/homepage');
        }
        fetchUserHubs();

    }, [navigate]);


    return (
        <div>
            <h1 className='hub-content'>{currentHubName}</h1>
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
