import React, { Component, useState, useEffect } from "react";
import { Container, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get("csrftoken")
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    bio: 'This is a new user'
                })
            });

            if (!response.ok) {
                throw new Error(`Error creating user: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('User created successfully:', data);
            setShouldRedirect(true);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    useEffect(() => {
        if (shouldRedirect) {
            Cookies.set('username', username, { expires: Infinity });
            navigate('/'); // Redirect to home page on successful creation
        }
    }, [shouldRedirect]);

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <div className="login-container p-4 shadow">
                <h2 className="text-center mb-4">Login</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your email"
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
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
                <p className="mt-3 text-center"> Or Create an Account</p>
                <div className=" d-flex align-items-center justify-content-center">
                    <Button variant="outline-secondary" type="submit" className="w-50" onClick={handleOnClick}>
                        Create Account
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Login;