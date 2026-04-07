import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VideoPlayer from './PlayHighlight';

export interface Highlight {
    title: string;
    content: string;
    thumbnail: string;
    description?: string;
    date: string;
}

export interface HighlightsBodyProps {
    highlights: Highlight[];
}

export default function HighlightsBody({ highlights } : HighlightsBodyProps) {
    const [playVideo, setPLayVideo] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")
    const [videoTitle, setVideoTitle] = useState("")

    const handleClickVideo = (content: string, title: string) => {
        setPLayVideo(true)
        setVideoUrl(content)
        setVideoTitle(title)
    }

    const handleHideVideoModal = () => {
        setPLayVideo(false)
    }

    return (
        <>
        <Container className="d-flex flex-column justify-content-start align-items-center" style={{border: "1px solid black", width: "700px", marginTop: "10px", minHeight: "1000px"}}>
            {highlights.map((item, index) => (
                <div key={index} style={{border: "1px solid black", width: "680px", height: "130px", marginTop: "10px", justifyContent: "flex-start", alignItems: "flex-start", display: "flex"}}>
                    <div style={{height: "130px", width: "220px"}}>
                        <img 
                            src={item.thumbnail ?? "NoThumbnail.jpg"}
                            onClick={() => handleClickVideo(item.content, item.title)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                cursor: "pointer"
                            }}
                        />
                    </div>
                    <div className='d-flex flex-column' style={{height: "150px", width: "445px", marginTop: "10px", marginLeft: "10px"}}>
                        <div style={{ textDecoration: "underline", justifyContent: "flex-start", 
                            display: "flex", marginLeft: "10px", marginRight: "10px", marginTop: "10px", cursor: "pointer"}} onClick={() => handleClickVideo(item.content, item.title)}>
                                {item.title}
                        </div>
                        <div style={{ justifyContent: "flex-start", 
                            display: "flex", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}}>
                                {item.description}
                        </div>
                        <div style={{ justifyContent: "flex-start", 
                            display: "flex", marginLeft: "10px", marginRight: "10px", marginTop: "10px"}}>
                                {item.date}
                        </div>
                    </div>
                </div>
            ))}
            {playVideo && 
                <div style={{border: "1px solid black"}}>
                    <VideoPlayer 
                        show={playVideo}
                        onHide={handleHideVideoModal}
                        content={videoUrl}
                        title={videoTitle}
                    />
                </div>
            }
        </Container>
        </>
    );
}