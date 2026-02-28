import React, { Fragment } from "react"
import { Navbar, Nav, Button, Carousel, Row, Col, ButtonGroup, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

export default function Home() {
    return (
        <Fragment>
            <Image src="Logo.png" className="w-25" alt="Logo"/>
            <h1 style={{fontSize: 20}}>Welcome to</h1>
            <h2>Northern Athletics</h2>
            <h3 style={{fontSize: 22}}>Where Atheletes go Pro</h3>

            <ButtonGroup vertical style={{gap: "10px", marginBottom: "100px"}} className="rounded">
                <Button href="Sign-up" variant="secondary" style={{backgroundColor: "inherit", 
                    color: "black"}}>Sign-up
                    </Button>
                <Button href="Sign-in" variant="secondary" style={{backgroundColor: "inherit", 
                    color: "black"}}>Sign-in
                    </Button>
            </ButtonGroup>
            
            <h4>Trending Highlights</h4>
            <Carousel style={{marginTop: "30px", marginBottom: "90px"}}>
                <Carousel.Item className="carousel-settings">
                    <iframe 
                    src="https://www.youtube.com/embed/R4nI6taCb0s?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s" 
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    ></iframe> 
                </Carousel.Item>
                <Carousel.Item>
                    <iframe 
                    src="https://www.youtube.com/embed/YRjuToMLESU?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s" 
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    ></iframe> 
                </Carousel.Item>
                <Carousel.Item>
                    <iframe 
                    src="https://www.youtube.com/embed/2SuWLe54KjU?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s" 
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    ></iframe> 
                </Carousel.Item>
            </Carousel>

            <Table style={{marginTop: "100px"}}>
                <thead style={{borderColor: 'white'}}>
                    <tr>
                        <th>Terms & Services</th>
                        <th>Contact Us</th>
                        <th>Work With Us</th>
                        <th>Contents</th>
                    </tr>
                </thead>
                <tbody style={{borderColor: 'white'}}>
                    <tr>
                        <td>Some Term</td>
                        <td><Button variant="light" className="hyperlink">Address</Button></td>
                        <td><Button variant="light" className="hyperlink">
                            Apply Here!</Button></td>
                        <td><Button variant="light" className="hyperlink">Sign Up</Button></td>
                    </tr>
                    <tr>
                        <td>Some Service</td>
                        <td>Phone Number</td>
                        <td></td>
                        <td><Button variant="light" className="hyperlink">About</Button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{textDecoration: 'underline'}}>Email</td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
}