import { Card, Container } from 'react-bootstrap';
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
        <Container className="highlights-shell">
            <div className="section-heading" style={{ marginBottom: "16px" }}>
                <div>
                    <div className="eyebrow" style={{ marginBottom: "10px" }}>Highlights</div>
                    <h2 className="section-title">Show your best reps in a clean media-first feed.</h2>
                </div>
                <p className="section-subtitle">Cards are now structured to feel like a premium showcase instead of a plain list.</p>
            </div>

            <Card className="highlight-feed-card">
                {highlights.length === 0 ? (
                    <div className="empty-panel">
                        <h3>No highlights yet</h3>
                        <p className="muted-copy">Add a highlight to start building a more complete athlete story.</p>
                    </div>
                ) : (
                    <div className="highlight-list">
                        {highlights.map((item, index) => (
                            <div key={index} className="highlight-item">
                                <div className="highlight-item-image">
                                    <img
                                        src={item.thumbnail || "NoThumbnail.jpg"}
                                        onClick={() => handleClickVideo(item.content, item.title)}
                                        alt={item.title}
                                    />
                                </div>
                                <div className="highlight-item-content">
                                    <h3 style={{ marginBottom: 0, cursor: "pointer" }} onClick={() => handleClickVideo(item.content, item.title)}>
                                        {item.title}
                                    </h3>
                                    <div className="muted-copy">{item.description}</div>
                                    <div className="profile-badge-row">
                                        <span className="profile-stat-chip">{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {playVideo && (
                <VideoPlayer
                    show={playVideo}
                    onHide={handleHideVideoModal}
                    content={videoUrl}
                    title={videoTitle}
                />
            )}
        </Container>
    );
}