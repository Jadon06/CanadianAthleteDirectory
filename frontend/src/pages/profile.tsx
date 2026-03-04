import { Button, Form, Navbar, Container, Nav, NavDropdown, Card, ButtonGroup, Table} from 'react-bootstrap';

export default function profile(){
    return (
        <>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <Container style={{width: "600px", height: "250px", 
                        border: "1px solid black", flexDirection: "column", display: "flex", borderRadius: "20px"}}>
                            <img src="/nopfp_img.jpg" 
                            style={{border: "1px solid black", borderRadius: "100px", 
                            display: "block", width:"100px", height:"100px", marginTop: "10px"}}/>
                            
                            <Button variant='outline-Light' href="" className="nav-link-underline" style={{marginTop: "10px", width: "100px", 
                                fontSize:"12px", border: "0"}}>
                                Contact info</Button>
                            
                            <Card className="mt-auto" style={{height: "20px",border: "1px solid black", 
                                marginBottom: "10px", justifyContent: "center"}}>
                                <Card.Title style={{textAlign: "left"}}>Headline</Card.Title>
                            </Card>
                    </Container>
                    <Container style={{width: "250px", height: "600px", 
                        border: "1px solid black", flexDirection: "column", display: "flex", 
                        marginLeft: "10px", borderRadius: "20px"}}>
                            <Table style={{marginTop: "10px", borderColor: "transparent"}}>
                                <thead>
                                    <tr>
                                        <th>Stats</th>
                                    </tr>
                                </thead>
                                <tbody style={{borderColor: "transparent"}}>
                                    {/* add templates for different sports here */}
                                </tbody>
                            </Table>
                    </Container>
                </div>
            </div>
        </>
    );
}