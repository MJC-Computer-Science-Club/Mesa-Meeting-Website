import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component, useEffect } from "react";
import mesa_logo from "../../static/images/mesa_logo.png"
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function Defaultnavbar({ currentChannel, onChannelClick, allChannels }) {

  useEffect(() => {
    console.log("allchannels: ", allChannels)
  }, [allChannels])

  const navigate = useNavigate();
  
  return (
    <Navbar className="navbar navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="#home">
          <a href="/">
            <img className="main-logo" src={mesa_logo} alt="Logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        {allChannels.map((channel) => (
          <Navbar.Text key={channel["name"]}>
            <button
              onClick={() => onChannelClick(channel)}
              className={currentChannel === channel ? 'active' : ''}
            >
              {channel["name"]}
            </button>
          </Navbar.Text>
        ))}
          <Navbar.Text>
            <div>
            {(Cookies.get("username") !== undefined) ? (
                <p>Welcome, {Cookies.get("username")}!</p>
                ) : (
                <Button className="btn btn-primary" onClick={() => navigate('/login')}>
                  Login
                </Button> 
              )
            }
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};