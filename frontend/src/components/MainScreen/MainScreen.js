import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";

export default function MainScreen() {

    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("username") === undefined) {
            console.log("Navigate");
            navigate('/homepage');
        }
    }, [navigate]);


    return (
        <div>
            {(Cookies.get("username") !== undefined) ? (
                <h1>Inside of here</h1>
            ) : 
                null
            }
        </div>
    )
}
