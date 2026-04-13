import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { apiUrl } from '../utils/api';

export interface User {
    first_name: string;
    middle_name: string;
    last_name: string;
    headline: string;
    phone_number: string;
    email: string;
}

interface UpdateUserPayload extends User {
    bio?: string;
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
    const [saveError, setSaveError] = useState('')

    const handleChange = (key: keyof User, value: string) => {
        setUpdatedData(prev => ({
            ...prev,
            [key] : value
        }));
    };
    
    const fetchUser = async() => {
        const response = await fetch(apiUrl('/users/me/'), {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            setUpdatedData(data);
        }
    }

    useEffect(() => {
        if (show) {
            void fetchUser()
            setSaveError('')
        }
    }, [show]);

    const updateInformation = async() => {
        const payload: UpdateUserPayload = {
            ...updatedData,
            bio: updatedData.headline,
        }

        const response = await fetch(apiUrl('/users/'), {
            method: 'PUT',
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const message = await response.text()
            setSaveError(message || 'Failed to save profile header changes')
            return
        }

        await response.json()
        await fetchUser();
        onHide();
    }
    useEffect(() => {
        if (initialUser) {
            setUpdatedData(initialUser);
        }
    }, [initialUser]);

    return (
        <>
            <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Header</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form className="d-grid gap-3">
                        <Form.Group>
                            <Form.Label>Personal Info</Form.Label>
                            <InputGroup className="modal-input" style={{ marginBottom: "10px" }}>
                                <InputGroup.Text>First Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.first_name}
                                    onChange={e => handleChange("first_name", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="modal-input" style={{ marginBottom: "10px" }}>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.middle_name}
                                    onChange={e => handleChange("middle_name", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="modal-input" style={{ marginBottom: "10px" }}>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.last_name}
                                    onChange={e => handleChange("last_name", e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "10px" }}>
                            <Form.Label>Headline</Form.Label>
                            <Form.Control 
                                value={updatedData.headline}
                                onChange={e => handleChange("headline", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact Info</Form.Label>
                            <InputGroup className="modal-input" style={{ marginBottom: "10px" }}>
                                <InputGroup.Text>phone-number</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.phone_number}
                                    onChange={e => handleChange("phone_number", e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="modal-input">
                                <InputGroup.Text>email</InputGroup.Text>
                                <Form.Control 
                                    value={updatedData.email}
                                    onChange={e => handleChange("email", e.target.value)}    
                                />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {saveError && <div className="text-danger me-auto">{saveError}</div>}
                    <Button className="action-button btn" onClick={updateInformation}>Done</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditHeaderProfile;