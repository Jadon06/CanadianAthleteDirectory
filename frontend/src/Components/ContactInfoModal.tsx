import { Modal, Form, Button, InputGroup, Card, Table, ModalBody } from 'react-bootstrap';
import { useEffect, useState } from 'react'

export interface ViewContactInfoProp {
    show: boolean;
    onHide: () => void;
}

export default function ContactInfo({ show, onHide } : ViewContactInfoProp) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    
    const fetchContactInfo = async() => {
        const response = await fetch("http://localhost:8001/users/me/", {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            console.log("data retrieved")
            setPhoneNumber(data.phone_number)
            setEmail(data.email)
        }
    }
    useEffect(() => {
        fetchContactInfo()
    }, [show])

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                    <Modal.Title>Contact Info</Modal.Title>
            </Modal.Header>
            <ModalBody>
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <th>phone-number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{border: "transparent"}}>
                            <td>{phoneNumber}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{border: "transparent"}}>{email}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            </ModalBody>
        </Modal>
    );
    
}