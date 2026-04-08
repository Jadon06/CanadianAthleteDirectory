import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useState } from 'react'

interface EditUpcomingEventsProps {
    show: boolean;
    onHide: () => void;
}

function EditUpcomingEvents({ show, onHide } : EditUpcomingEventsProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid gap-3">
                <InputGroup className="modal-input">
                    <InputGroup.Text>Title</InputGroup.Text>
                    <Form.Control placeholder='event name/title'/>
                </InputGroup>
                <InputGroup className="modal-input">
                    <InputGroup.Text>Time Start</InputGroup.Text>
                    <Form.Control aria-label="Time" type="time" placeholder='12:00 am/pm'/>
                </InputGroup>
                <InputGroup className="modal-input">
                    <InputGroup.Text>Time End</InputGroup.Text>
                    <Form.Control aria-label="Time" type="time" placeholder='12:00 am/pm'/>
                </InputGroup>
                <InputGroup className="modal-input">
                    <InputGroup.Text>Select Date</InputGroup.Text>
                    <div style={{ display: "inline-block", flex: 1 }}>
                        <DatePicker
                            className="form-control"
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            dateFormat="MM/dd/yyyy" // Optional: customize the date format
                        />
                    </div>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button className="action-button btn" onClick={onHide}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditUpcomingEvents;