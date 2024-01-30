import React, { Component } from "react";
import { render } from "react-dom";
import Button from 'react-bootstrap/Button';
// import NavBar from "./navbar";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {/* <NavBar /> */}
                <h1>Testing Mesa Code, Yippie!</h1>
                <Button>React Button Test</Button>
            </div>
        )
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);