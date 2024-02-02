import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

// Images
import stupid_pic from "../../static/images/stupid_pic.png"

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container hero">
                    <div className="row">
                        <div className="col-md-6 mx-auto d-flex my-auto" align="center">
                            <div>
                                <h1>Welcome to MESA Collaborate</h1>
                                <p>Forge study connections effortlessly. Input your preferred subjects and availability, and join your fellow MESA students for collaborative sessions. Elevate your learning experience by sharing insights and tackling challenges together. </p>
                                <br />
                                <a href="login">
                                    <Button className="btn btn-primary btn-lg">Join Now</Button>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 mx-auto" align="center">
                            <img className="hero-image" src={stupid_pic} alt="stupid picture" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}