import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';

export interface Highlight {
    title: string;
    content: string;
    thumbnail: string;
    description?: string;
}

export interface HighlightsBodyProps {
    highlights: Highlight[];
}

export default function HighlightsBody({ highlights } : HighlightsBodyProps) {
    return (
        <>
        <Container className="d-flex justify-content-center" style={{border: "1px solid black", width: "700px", marginTop: "10px", minHeight: "1000px"}}>
            {highlights.map((item, index) => (
                <div key={index} style={{border: "1px solid black", width: "680px", height: "170px", marginTop: "10px", justifyContent: "flex-start", alignItems: "flex-start", display: "flex"}}>
                    <div style={{height: "170px", width: "220px"}}>
                        <img 
                            src={item.thumbnail ?? "NoThumbnail.jpg"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </div>
                    <div className='d-flex flex-column' style={{height: "150px", width: "445px", marginTop: "10px", marginLeft: "10px"}}>
                        <div style={{ textDecoration: "underline", justifyContent: "flex-start", 
                            display: "flex", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}}>
                                {item.title}
                        </div>
                        <div style={{ textDecoration: "underline", justifyContent: "flex-start", 
                            display: "flex", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}}>
                                {item.description}
                        </div>
                    </div>
                </div>
            ))}
        </Container>
        </>
    );
}