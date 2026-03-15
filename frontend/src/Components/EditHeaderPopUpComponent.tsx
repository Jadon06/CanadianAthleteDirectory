import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react'

export interface EditHeaderProfileProps {
    show: boolean;
    onHide: () => void;
    initialUser: {
        firstName: string;
        middleName: string;
        lastName: string;
        headline: string;
        phoneNumber: string;
        email: string;
    }
}

function EditHeaderProfile({ show, onHide, initialUser}: EditHeaderProfileProps) {
    const [updatedData, setUpdatedData] = useState(() => initialUser)

    const handleChange = (key: keyof EditHeaderProfileProps["initialUser"], value: string) => {
        setUpdatedData(prev => ({
            ...prev,
            [key] : value
        }));
    };

    const updateInformation = async() => {
        const response = await fetch('http://localhost:8001/users/', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        })
        console.log(response)
        onHide();
    }

    return (
        <>
            <Modal show={show} onHide={updateInformation} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Header</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{marginBottom: "40px"}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Personal Info</Form.Label>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>First Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.firstName}
                                    onChange={e => handleChange("firstName", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.middleName}
                                    onChange={e => handleChange("middleName", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.lastName}
                                    onChange={e => handleChange("lastName", e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{marginBottom: "10px"}}>
                            <Form.Label>Headline</Form.Label>
                            <Form.Control 
                                // placeholder='highlight yourself in a quick sentence'
                                value={updatedData.headline}
                                onChange={e => handleChange("headline", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact Info</Form.Label>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>phone-number</InputGroup.Text>
                                <Form.Control 
                                    // placeholder='xxx-xxx-xxxx'
                                    value={updatedData.phoneNumber}
                                    onChange={e => handleChange("phoneNumber", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>email</InputGroup.Text>
                                <Form.Control 
                                    // placeholder='something@email.com'
                                    value={updatedData.email}
                                    onChange={e => handleChange("email", e.target.value)}    
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Button onClick={updateInformation} style={{position: "absolute", bottom: "5px", right: "5px"}}>Done</Button>
            </Modal>
        </>
    );
}

export default EditHeaderProfile;