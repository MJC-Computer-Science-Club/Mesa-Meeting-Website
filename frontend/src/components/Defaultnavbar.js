import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { Component } from "react";

export default function Defaultnavbar() {
  return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Mesa Meeting Site</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">Test User</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
  };