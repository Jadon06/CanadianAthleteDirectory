import { Button, Form, Carousel, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

import "../App.css"
import EditHeaderProfile from '../Components/EditHeaderPopUpComponent.tsx';
import EditUpcomingEvents from '../Components/EditUpcomingEvents.tsx';
import { useState } from 'react';
import Modal from "../Components/portal.tsx"

export default function profile(){
    const [isEditHeaderModalVisible, setIsEditHeaderModalVisible] = useState(false)
    const [isEditGameScheduleModalVisible, setIsEditGameScheduleModalVisible] = useState(false)
    const [userData, setUserData] = useState<{
        firstName: string;
        middleName: string;
        lastName: string;
        headline: string;
        phoneNumber: string;
        email: string;
    } | null>(null);


    const navigate = useNavigate()

    const fetchUser = async() => {
        const response = await fetch('http://localhost:8001/me/')
        let data = await response.json();
        setUserData(data);
    }

    const handleClick = () => {
        navigate("/")
    }

    return (
        <>
        <div className='d-flex flex-row'>
            
            <div className='d-flex flex-column' style={{alignItems: "center"}}>
                <div className='d-flex flex-column'style={{alignItems: "center", position: "absolute", left: "30px"}}>
                    <img 
                        src="Logo.png" 
                        alt="Edit" 
                        // onClick={handleClick}
                        style={{ cursor: "pointer", height: "80px", width: "80px", 
                            marginBottom: "10px", marginLeft: "15px"}}
                    />
                    <IoIosHome className='buttonbar-button'/>
                    <FaUserFriends className='buttonbar-button'/>
                    <IoIosNotifications className='buttonbar-button'/>
                    <LuMessageSquareMore className='buttonbar-button'/>
                    <FaSearch className='buttonbar-button'/>
                </div>
            </div>

            <Container>
                <div className='d-flex flex-column'>
                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column'>
                            <Container className='headProfile-container' style={{position: "relative"}}>
                                <CiEdit className="edit-button" style={{
                                    }} onClick={() => setIsEditHeaderModalVisible(true)}
                                />
                                {userData && <EditHeaderProfile
                                    show={isEditHeaderModalVisible}
                                    onHide={() => setIsEditHeaderModalVisible(false)}
                                    initialUser={userData}
                                />}
                                <Container>
                                    <div className='d-flex flex-column' style={{justifyContent: "center"}}>
                                            <img src="/nopfp_img.jpg" 
                                                className='pfp-img'/>
                                        
                                        <div className="d-flex flex-row align-items-center">
                                            <Button variant='outline-Light' href="" className="nav-link-underline" style={{marginTop: "10px", width: "100px", 
                                                fontSize:"12px", border: "1px solid black"}}>
                                                Contact info
                                            </Button>   
                                            <Container style={{marginLeft: "10px", width: "auto", height: "20px"}}>
                                                <h1 style={{fontSize: "20px", left: "10px"}}>
                                                    user name
                                                </h1>
                                            </Container>
                                        </div>                                   
                                    </div>
                                </Container>
                                        
                                    <Card className="mt-auto" style={{height: "20px", border: "1px solid black", 
                                        marginBottom: "10px", justifyContent: "center", borderRadius: "20px"}}>
                                        <Card.Title style={{textAlign: "left"}}>Headline</Card.Title>
                                    </Card>
                            </Container>
                            <Container style={{width: "600px", height: "340px", border:"1px solid black", marginTop:"10px", borderRadius:"20px", position: "relative"}}>
                                <CiEdit className="edit-button"/>
                                <Container style={{width: "auto", height:"20px"}}>
                                    <h1 style={{fontSize: "15px", marginTop:"10px"}}>HighLights</h1>
                                    <Carousel style={{border: "1px solid black", marginTop: "15px", height:"265px",
                                        borderRadius:"20px"
                                    }}>
                                        <Carousel.Item>
                                            <iframe>{/*Add content here*/}</iframe>
                                        </Carousel.Item>
                                    </Carousel>
                                </Container>
                            </Container>
                        </div>
                        <div className='d-flex flex-column'>
                        <Container style={{width: "300px", height: "400px", 
                            border: "1px solid black", flexDirection: "column", display: "flex", 
                            marginLeft: "10px", borderRadius: "20px", position: "relative"}}>
                                <CiEdit className="edit-button"/>
                                <Table style={{marginTop: "10px", borderColor: "transparent"}}>
                                    <thead>
                                        <tr>
                                            <th>Stats</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{borderColor: "transparent"}}>
                                        {/* add templates for different sports here */}
                                    </tbody>
                                </Table>
                        </Container>
                        <Container style={{width: "300px", height: "190px", 
                            border: "1px solid black", flexDirection: "column", display: "flex", 
                            marginLeft: "10px", borderRadius: "20px", marginTop: "10px", position: "relative"}}>
                            <CiEdit className="edit-button"/>
                            <Table style={{marginTop: "10px", borderColor: "transparent"}}>
                                <thead>
                                    <tr>
                                        <th>Career Accolades</th>
                                    </tr>
                                </thead>
                                <tbody style={{borderColor: "transparent"}}>
                                    {/* add templates for different sports here */}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                    </div>
                    <div className='d-flex flex-row'>
                        <Container style={{width: "600px", minHeight: "300px",
                            border: "1px solid black", flexDirection: "column", display: "flex", 
                            borderRadius: "20px", marginTop: "10px"}}>
                        <Container style={{marginTop: "10px", position: "relative", marginBottom: "20px"}}>
                                <CiEdit className="edit-button"/>
                                <h1 style={{fontSize: "20px", marginTop: "5px"}}>Education</h1>
                            </Container>
                            <Card style={{height: "100px", border: "1px solid black", marginBottom: "10px", borderRadius: "20px"}}>
                                <CiEdit className="edit-button"/>
                                <Card.Title style={{textAlign: "center"}}>Education1</Card.Title>                            
                            </Card>
                            <Button className="hyperlink" style={{height: "100px", width: "580px", borderRadius: "20px", background:"lightgrey",
                                border: "1px solid black", color: "black"
                                }}>
                                Add Education
                            </Button>
                        </Container>
                        <Container style={{width: "300px", minHeight: "300px",
                            border: "1px solid black", flexDirection: "column", display: "flex", 
                            borderRadius: "20px", marginTop: "10px", marginLeft: "10px", position: "relative"}}>
                            <CiEdit className="edit-button" onClick={() => setIsEditGameScheduleModalVisible(true)}/>
                            <EditUpcomingEvents show={isEditGameScheduleModalVisible} onHide={() => setIsEditGameScheduleModalVisible(false)}/>
                            <Table style={{marginTop: "10px", borderColor: "transparent"}}>
                                <thead>
                                    <tr>
                                        <th>Game Schedule</th>
                                    </tr>
                                </thead>
                                <tbody style={{borderColor: "transparent"}}>
                                    {/* add templates for different sports here */}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </div>
            </Container>
        </div>
    </>
    );
}