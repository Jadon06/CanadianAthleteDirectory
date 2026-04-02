import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react'

export interface User {
    first_name: string;
    middle_name: string;
    last_name: string;
    headline: string;
    phone_number: string;
    email: string;
}

export interface EditHeaderProfileProps {
    show: boolean;
    onHide: () => void;
    initialUser?: User | null;
}

function EditHeaderProfile({ show, onHide, initialUser}: EditHeaderProfileProps) {
    const defaultUser: User = {
        first_name: '',
        middle_name: '',
        last_name: '',
        headline: '',
        phone_number: '',
        email: ''
    };
    
    const [updatedData, setUpdatedData] = useState<User>(initialUser ?? defaultUser)

    const handleChange = (key: keyof User, value: string) => {
        setUpdatedData(prev => ({
            ...prev,
            [key] : value
        }));
    };
    
    const fetchUser = async() => {
        const response = await fetch('http://localhost:8001/users/me/', {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            setUpdatedData(data);
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    const updateInformation = async() => {
        console.log("About to send:", updatedData);
        const response = await fetch('http://localhost:8001/users/', {
            method: 'PUT',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        })
        const data = await response.json()
        fetchUser();
        onHide();
    }
    useEffect(() => {
        if (initialUser) {
            setUpdatedData(initialUser);
        }
    }, [initialUser]);

    return (
        <>
            <Modal show={show} onHide={() => {
                    updateInformation();
                    onHide();
                }} centered>
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
                                    value={updatedData.first_name}
                                    onChange={e => handleChange("first_name", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.middle_name}
                                    onChange={e => handleChange("middle_name", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.last_name}
                                    onChange={e => handleChange("last_name", e.target.value)}
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
                                    value={updatedData.phone_number}
                                    onChange={e => handleChange("phone_number", e.target.value)}
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