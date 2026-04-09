import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react'
import type { Highlight } from './HighlightsBody';

export interface CreateHighlightProps {
    show: boolean;
    onHide: () => void;
}

export default function CreateHighlightModal({ show, onHide }: CreateHighlightProps) {
    const [highlightData, setHighlightData] = useState<Highlight>({
        title: "",
        content: "",
        thumbnail: "",
        description: "",
        date: ""
        })
    
    const createHighlight = async() => {
        const response = await fetch("http://localhost:8001/highlights/", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json', // Required for JSON data
            },
            body: JSON.stringify(highlightData),
        })
        const data = await response.json()
        console.log(data)
    }

    const handleClickFinish = async () => {
        await createHighlight();
        onHide();
    }

    const handleChange = (key: keyof Highlight, value: string) => {
        setHighlightData(prev => ({
            ...prev,
            [key] : value
        }));
    };

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
            <Modal.Header closeButton>
                <Modal.Title>Create Highlight</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid gap-3">
            <InputGroup className="modal-input">
                <InputGroup.Text id="title">title</InputGroup.Text>
                    <Form.Control
                        placeholder={"Enter Here"}
                        value={highlightData.title}
                        onChange={e => handleChange("title", e.target.value)}
                    />
            </InputGroup>
            <InputGroup className="modal-input">
                <InputGroup.Text id="content">content</InputGroup.Text>
                    <Form.Control
                        placeholder={".mp4/.mov/.hvec"}
                        value={highlightData.content}
                        onChange={e => handleChange("content", e.target.value)}
                    />
            </InputGroup>
            <InputGroup className="modal-input">
                <InputGroup.Text id="description">description</InputGroup.Text>
                    <Form.Control
                        placeholder={"describe the highlight in a few words"}
                        value={highlightData.description}
                        onChange={e => handleChange("description", e.target.value)}
                    />
            </InputGroup>
            <InputGroup className="modal-input">
                <InputGroup.Text id="thumbnail">thumbnail</InputGroup.Text>
                    <Form.Control
                        placeholder={".jpg/.png/.img"}
                        value={highlightData.thumbnail}
                        onChange={e => handleChange("thumbnail", e.target.value)}
                    />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className="action-button btn" onClick={handleClickFinish}>Finish</Button>
            </Modal.Footer>
        </Modal>
    );
}