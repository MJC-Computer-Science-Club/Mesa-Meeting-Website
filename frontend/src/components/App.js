import React, { Component } from "react";
import { render } from "react-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Defaultnavbar from "./Defaultnavbar";
import { BrowserRouter as Router, Routes, Route, Link, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./Login"

// Images
import stupid_pic from "../../static/images/stupid_pic.png"
import HomePage from "./HomePage";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Defaultnavbar />
                <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route exact path="/login" element={<Login />} />
                        </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);