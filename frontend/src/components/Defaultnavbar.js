import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from "react";
import mesa_logo from "../../static/images/mesa_logo.png"
import Button from 'react-bootstrap/Button';

export default function Defaultnavbar() {
  return (
        <Navbar className="navbar navbar-dark bg-dark">
          <Container>
            <Navbar.Brand href="#home">
              <a href="/">
                <img src={mesa_logo} alt="Logo" />
              </a>
              </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button className="btn btn-primary">
                  <a href="/login">
                    Login
                  </a>
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
  };