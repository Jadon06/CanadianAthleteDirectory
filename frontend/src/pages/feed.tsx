import { Button, Form, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';


export default function feed() {
    return (
        <>
            <Navbar expand='lg' sticky='top' style={{top: "0px"}}>
                <Container fluid>
                    <Navbar.Brand href="/feed">Home</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="" className='nav-settings'>Messages</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}