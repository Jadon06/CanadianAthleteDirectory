import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar, Tab} from 'react-bootstrap';

interface ProfileHeaderProps {
    ProfilePic: string;
    Name: string;
    Age: string;
    Position: string;
    Height: string;
    Weight: string;
    PPG: string;
    Assists: string;
    Rebounds: string;
    FieldGoal: string;
    School: string;
    Contact: () => void;
    Connect: () => void;
    Analytics: () => void;
}

export default function ProfileHeader({ ProfilePic, Name, Age, Position, Height, Weight, PPG, Assists, Rebounds, FieldGoal, School, Contact, Connect, Analytics } : ProfileHeaderProps) {
    return (
        <Container style={{border: "1px solid black", height: "240px", width: "700px"}}>
            <div className='d-flex flex-row gap-2'>
                <Container style={{border: "1px solid black", height: "200px", width: "200px", marginTop: "20px"}}>
                    <img 
                        src={ProfilePic ?? "nopfp_img.jpg"}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                </Container>
                <Container style={{height: "200px", width: "450px", marginTop: "20px"}}>
                    <div className='d-flex flex-column'>
                        <Table size="sm" style={{marginBottom: "0px", marginTop: "10px", border: "transparent"}}>
                            <thead>
                                <tr style={{ textAlign: "left" }}>
                                    <th>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <span>
                                                {Name ?? "Name"}, {Position ?? "position"}
                                            </span>
                                            <div
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "1px solid black"
                                                }}>
                                                    <img 
                                                        src={School}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>  
                        </Table>
                        <Container style={{border: "1px solid black", height: "auto"}}>
                        <Table size='sm'>
                            <thead>
                                <tr style={{ textAlign: "left", border: "black"}}>
                                    <th>Stats</th>
                                </tr>
                                <tr style={{ textAlign: "left", border: "transparent"}}>
                                    <th>Ht: {Height ?? "0ft"}</th>
                                    <th>Wt: {Weight ?? "0lbs"}</th>
                                    <th>Age: {Age ?? "0"}</th>
                                    <th>PPG: {PPG ?? "0ppg"}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr style={{ textAlign: "left", border: "transparent"}}>
                                    <th>AST: {Assists ?? "0ast"}</th>
                                    <th>Reb: {Rebounds ?? "0reb"}</th>
                                    <th>Fg%: {FieldGoal ?? "0%"}</th>
                                </tr>
                            </thead>
                        </Table>
                        </Container>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "6px", gap: "5px"}}>
                        <Button className="hyperlink btn" onClick={Connect}>Connect</Button>
                        <Button className="hyperlink btn" onClick={Contact}>Contact</Button>
                        <Button className="hyperlink btn" onClick={Analytics}>Analytics</Button>
                    </div>
                    
                </Container>
            </div>
        </Container>
    );
}