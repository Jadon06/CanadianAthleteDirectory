import { Modal, Card, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { apiUrl } from '../utils/api';

export interface ViewContactInfoProp {
    show: boolean;
    onHide: () => void;
}

export default function ContactInfo({ show, onHide } : ViewContactInfoProp) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    
    const fetchContactInfo = async() => {
        const response = await fetch(apiUrl('/users/me/'), {
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
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
            <Modal.Header closeButton>
                    <Modal.Title>Contact Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="surface-card" style={{ padding: "8px", borderRadius: "20px" }}>
                <Table borderless className="mb-3">
                    <thead>
                        <tr>
                            <th>phone-number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{phoneNumber}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table borderless className="mb-0">
                    <thead>
                        <tr>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{email}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            </Modal.Body>
        </Modal>
    );
    
}