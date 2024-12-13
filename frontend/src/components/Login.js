import React, { Component, useState, useEffect } from "react";
import { Container, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = async (event) => {
        event.preventDefault();
        console.log("What the skibidi");
        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            });

            if (!response.ok) {
                throw new Error(`Error logging in user: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Successfully logged in:', data);
            Cookies.set("token", data.token)
            setShouldRedirect(true);
        } catch (error) {
            console.error('Successfully logged in:', error);
        }
    };

    const navigateToCreation = async () => {
        navigate("../account-creation")
    }

    useEffect(() => {
        if (shouldRedirect) {
            Cookies.set('username', username, { expires: Infinity });
            navigate('/'); // Redirect to home page on successful creation
        }
    }, [shouldRedirect]);

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div className="login-container p-4 shadow">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleOnClick}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            n                     onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" onClick={handleOnClick}>
                        Login
                    </Button>
                    <p className="mt-3 text-center"> Or Create an Account</p>
                    <div className=" d-flex align-items-center justify-content-center">
                        <Button variant="outline-secondary" className="w-50" onClick={navigateToCreation}>
                            Create Account
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default Login;