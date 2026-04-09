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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const isYouTubeVideo = (url: string) => /youtube\.com|youtu\.be/.test(url)

    const getYouTubeEmbedUrl = (url: string) => {
        if (url.includes("embed/")) {
            const videoId = url.split("embed/")[1]?.split(/[?&]/)[0]
            return videoId
                ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
                : url
        }

        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/)
        const videoId = match?.[1]
        return videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`
            : url
    }

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
                <div />
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
                            <article key={index} className="highlight-item" onClick={() => handleClickVideo(item.content, item.title)}>
                                <div
                                    className="highlight-item-image"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex((current) => (current === index ? null : current))}
                                >
                                    {hoveredIndex === index ? (
                                        isYouTubeVideo(item.content) ? (
                                            <iframe
                                                className="highlight-hover-preview"
                                                src={getYouTubeEmbedUrl(item.content)}
                                                title={item.title || `Highlight ${index + 1}`}
                                                allow="autoplay; encrypted-media"
                                            />
                                        ) : (
                                            <video
                                                className="highlight-hover-preview"
                                                src={item.content}
                                                muted
                                                autoPlay
                                                loop
                                                playsInline
                                            />
                                        )
                                    ) : (
                                        <img
                                            src={item.thumbnail || "NoThumbnail.jpg"}
                                            alt={item.title || "Highlight thumbnail"}
                                        />
                                    )}
                                    <span className="highlight-time-chip">{item.date || "Recently uploaded"}</span>
                                </div>
                                <div className="highlight-item-content">
                                    <div className="highlight-channel-avatar">{(item.title || "H").trim().charAt(0).toUpperCase()}</div>
                                    <div className="highlight-copy-stack">
                                        <h3 style={{ marginBottom: 0, cursor: "pointer" }} onClick={() => handleClickVideo(item.content, item.title)}>
                                            {item.title || "Untitled highlight"}
                                        </h3>
                                        <div className="muted-copy">{item.description || "No description provided."}</div>
                                        <div className="highlight-meta-line">{item.date || "Recently uploaded"}</div>
                                    </div>
                                </div>
                            </article>
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