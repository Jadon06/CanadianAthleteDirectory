import { Button, Form, Navbar, Container, Nav, NavDropdown, Card, ButtonGroup} from 'react-bootstrap';

export default function feed() {
    return (
        <>
            <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/feed" className="d-flex align-items-center" 
                    style={{marginLeft: "100px"}}>
                        <img
                            src="/Logo.png"
                            width="40"
                            height="40"
                            style={{ marginRight: "8px", border: "1px solid red" }}
                            alt=""
                        />
                        NorthernAthlete
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-nav" />

                    <Navbar.Collapse id="main-nav" className="d-flex justify-content-between">
                        <Form className="d-flex" style={{ maxWidth: "400px"}}>
                            <Form.Control type="search" placeholder="search" />
                            <Button variant="primary" 
                                style={{background: "red",
                                border: "0px"
                            }}>Search</Button>
                        </Form>

                        <Nav style={{marginRight: "100px"}}>
                            <Nav.Link>Messages</Nav.Link>
                            <Nav.Link>Network</Nav.Link>
                            <Nav.Link>Notifications</Nav.Link>
                            <NavDropdown title="Profile">
                            <NavDropdown.Item href="/post">Post</NavDropdown.Item>
                            <NavDropdown.Item href="/upcoming-event">Upcoming Event</NavDropdown.Item>
                            <NavDropdown.Item href="/highlight">Highlight</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="/view">View Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <h1 style={{fontSize: "25px", marginTop: "0px"}}>Recommended</h1>
            <ul className='list-group'>
                <Container style={{width: "fit-content"}}>
                    {/* loop over the list from the backend to render recommended content using the template below */}
                    <Container style={{width: "fit-content"}}>
                        <Card>
                            <Card.Title>Title</Card.Title>
                            <iframe 
                                src="https://www.youtube.com/embed/R4nI6taCb0s?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s" 
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                            <Card.Body>
                                <Card.Text>Description</Card.Text>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <Button variant='secondary' style={{marginRight: "10px"}}>comment</Button>
                                    <Button variant='secondary' style={{marginRight: "10px"}}>Like</Button>
                                    <Button variant='secondary' style={{marginRight: "10px"}}>Repost</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </Container>
            </ul>
        </>
    );
}