import { Modal, Form, InputGroup, Card, Container, Table, Button } from 'react-bootstrap';
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

export default function Messages() {
    
    const navigate = useNavigate()

    const handleClickHome = () => {
        navigate("/")
    }

    const handleClickMessages = () => {
        navigate("/messages")
    }
    
    return (
        <div className='d-flex flex-row'>
            <div className='d-flex flex-column' style={{alignItems: "center"}}>
                <div className='d-flex flex-column'style={{alignItems: "center", position: "absolute", left: "30px", top: "32px"}}>
                    <img 
                        src="/Logo.png" 
                        alt="Edit" 
                        onClick={handleClickHome}
                        style={{ cursor: "pointer", height: "80px", width: "80px", 
                        marginBottom: "10px", marginLeft: "15px"}}
                    />
                    <IoIosHome id='home' className='buttonbar-button'/>
                    <FaUserFriends id='network' className='buttonbar-button'/>
                    <IoIosNotifications id='notifications' className='buttonbar-button'/>
                    <LuMessageSquareMore id='messages' className='buttonbar-button' onClick={handleClickMessages}/>
                    <FaSearch id='search' className='buttonbar-button'/>
                </div>
            </div>
            <Container data-bs-spy="scroll" style={{border: "1px solid black", width: "400px", minHeight: "550px", position: "absolute", left: "200px", top: "45px"}}>
                
                
            </Container>

        </div>
    );
}