import React, { Component } from "react";
import { render } from "react-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Defaultnavbar from "./Defaultnavbar";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Defaultnavbar />
                <h1>Testing Mesa Code, Yippie!</h1>
                <Button>React Button Test</Button>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);