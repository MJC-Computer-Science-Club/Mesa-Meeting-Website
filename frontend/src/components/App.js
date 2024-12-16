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
import CreateAccount from "./CreateAccount";

// Images
import stupid_pic from "../../static/images/stupid_pic.png"
import HomePage from "./HomePage";
import MainScreen from "./MainScreen/MainScreen";
import Chat from "./MainScreen/testmainscreen";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <BrowserRouter>
                        <Routes>
                            <Route exact path="/homepage" element={<HomePage />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/account-creation" element={<CreateAccount />} />
                            <Route exact path="/" element={<MainScreen />} />
                        </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);