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
                    <div style={{ flex: 1 }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleChange}
                            className="form-control"
                            popperPlacement="bottom-start"
                            popperModifiers={[
                                {
                                name: "offset",
                                options: { offset: [0, 8] }
                                } as any
                            ]}
                        />
                    </div>
                </InputGroup>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default EditUpcomingEvents;