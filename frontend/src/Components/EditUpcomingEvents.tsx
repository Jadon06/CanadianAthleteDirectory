import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { use, useState } from 'react'

interface EditUpcomingEventsProps {
    show: boolean;
    onHide: () => void;
}

function EditUpcomingEvents({ show, onHide } : EditUpcomingEventsProps) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const handleChange = (date: Date | null) => {
        setSelectedDate(date);
        onHide;
    };

    return (
        <>
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginBottom: "40px"}}>
                <InputGroup style={{marginBottom: "10px"}}>
                    <InputGroup.Text>Title</InputGroup.Text>
                    <Form.Control placeholder='event name/title'/>
                </InputGroup>
                <InputGroup style={{marginBottom: "10px"}}>
                    <InputGroup.Text>Time Start</InputGroup.Text>
                    <Form.Control aria-label="Time" type="time" placeholder='12:00 am/pm'/>
                </InputGroup>
                <InputGroup style={{marginBottom: "10px"}}>
                    <InputGroup.Text>Time End</InputGroup.Text>
                    <Form.Control aria-label="Time" type="time" placeholder='12:00 am/pm'/>
                </InputGroup>
                <InputGroup style={{marginBottom: "10px"}}>
                    <InputGroup.Text>Select Date</InputGroup.Text>
                    <div style={{ display: "inline-block" }}>
                        <DatePicker
                            className="form-control"
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            dateFormat="MM/dd/yyyy" // Optional: customize the date format
                        />
                    </div>
                </InputGroup>
                <Button onClick={onHide} style={{position: "absolute", bottom: "5px", right: "5px"}}>Done</Button>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default EditUpcomingEvents;