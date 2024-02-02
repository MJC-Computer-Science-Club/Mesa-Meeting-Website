import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

// Images
import stupid_pic from "../../static/images/stupid_pic.png"

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="hero-section">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="hero-content-container">
              <div className="hero-content">
                <h1>Welcome to MESA Collaborate</h1>
                <p>Forge study connections effortlessly. Input your preferred subjects and availability, and join your fellow MESA students for collaborative sessions. Elevate your learning experience by sharing insights and tackling challenges together.</p>
                <a href="login">
                  <Button variant="primary">Get Started</Button>
                </a>
              </div>
              <div className="hero-image-col">
                <img src={stupid_pic} alt="Hero Image" className="hero-image" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}