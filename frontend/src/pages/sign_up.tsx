import { Navbar, Nav, Button, Carousel, Row, Col, InputGroup, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import CreateNewUser from '../verify_api';
import Form from 'react-bootstrap/Form';

export default function Sign_up() {
    return (
        <>
             <h1 style={{marginBottom: "100px"}}>Sign Up Now</h1>
            <InputGroup className="input-settings">
                <InputGroup.Text id="first_name">First Name</InputGroup.Text>
                <Form.Control
                placeholder="Enter Here">
                </Form.Control>
            </InputGroup>

            <InputGroup className="input-settings">
                <InputGroup.Text id="last_name">Last Name</InputGroup.Text>
                <Form.Control
                placeholder="Enter Here">
                </Form.Control>
            </InputGroup>

            <InputGroup className="input-settings">
                <InputGroup.Text id="email">Email</InputGroup.Text>
                <Form.Control
                placeholder="Enter Here">
                </Form.Control>
            </InputGroup>

            <InputGroup className="input-settings">
                <InputGroup.Text id="phone_number">Phone Number</InputGroup.Text>
                <Form.Control
                placeholder="Enter Here">
                </Form.Control>
            </InputGroup>

            <Button variant='light' className='hyperlink' onClick={CreateNewUser} style={{marginTop: "50px", fontSize: "20px"}}
            >Finish</Button>
        </>
    );
}