import React, { Component } from "react";
import { Container, Form, Button } from 'react-bootstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleOnClick() {
        console.log("clicked")
    }

    render() {
        return (
            <Container className="d-flex justify-content-center align-items-center mt-5">
                <div className="login-container p-4 shadow">
                    <h2 className="text-center mb-4">Login</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter your username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                    <p className="mt-3 text-center"> Or Create an Account</p>
                    <div className=" d-flex align-items-center justify-content-center">
                        <Button variant="outline-secondary" type="submit" className="w-50" onClick={ this.handleOnClick }>
                            Create Account
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}