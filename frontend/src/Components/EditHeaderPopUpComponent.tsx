import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react'

interface EditHeaderProfileProps {
    show: boolean;
    onHide: () => void;
}

function EditHeaderProfile({ show, onHide }: EditHeaderProfileProps) {

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Header</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{marginBottom: "40px"}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Personal Info</Form.Label>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>First Name</InputGroup.Text>
                                <Form.Control placeholder='First Name'/>
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Middle Name</InputGroup.Text>
                                <Form.Control placeholder='Middle Name'/>
                            </InputGroup>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>Last Name</InputGroup.Text>
                                <Form.Control placeholder='Last Name'/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{marginBottom: "10px"}}>
                            <Form.Label>Headline</Form.Label>
                            <Form.Control placeholder='highlight yourself in a quick sentence'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact Info</Form.Label>
                            <InputGroup style={{marginBottom: "10px"}}>
                                <InputGroup.Text>phone-number</InputGroup.Text>
                                <Form.Control placeholder='xxx-xxx-xxxx'/>
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>email</InputGroup.Text>
                                <Form.Control placeholder='something@email.com'/>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Button onClick={onHide} style={{position: "absolute", bottom: "5px", right: "5px"}}>Done</Button>
            </Modal>
        </>
    );
}

export default EditHeaderProfile;