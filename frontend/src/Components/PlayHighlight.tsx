import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FiMaximize } from 'react-icons/fi';

export interface VideoPlayerProps {
    content: string;
    title: string;
    show: boolean;
    onHide: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, title, show, onHide }) => {
    const [videoUrl, setVideoUrl] = useState("")
    const [ytVideo, setYtVideo] = useState(false)
    const [videoTitle, setVideoTitle] = useState("")
    const playerWrapperRef = useRef<HTMLDivElement | null>(null)

    const toEmbedUrl = (url: string) => {
        if (url.includes("embed/")) {
            return url
        }

        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{6,})/)
        const videoId = match?.[1]
        return videoId
            ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`
            : url
    }

    useEffect(() => {
        setVideoUrl(content);
        setVideoTitle(title)
        setYtVideo(/youtube\.com|youtu\.be/.test(content));
    }, [content, title])

    const handleFullscreen = async() => {
        if (!playerWrapperRef.current) {
            return
        }

        if (document.fullscreenElement) {
            await document.exitFullscreen()
            return
        }

        await playerWrapperRef.current.requestFullscreen()
    }

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
            <Modal.Header closeButton>
                <Modal.Title>{videoTitle || "Highlight"}</Modal.Title>
                <button
                    type="button"
                    className="ghost-button btn"
                    style={{ marginLeft: "12px", minHeight: "36px", minWidth: "40px", padding: "0 10px" }}
                    onClick={handleFullscreen}
                    title="Fullscreen"
                    aria-label="Fullscreen"
                >
                    <FiMaximize />
                </button>
            </Modal.Header>

            <div ref={playerWrapperRef} style={{ width: "100%", background: "#000" }}>
                {!ytVideo && (
                    <video width="100%" controls style={{ display: "block", maxHeight: "78vh" }}>
                        <source src={videoUrl} />
                        Your browser does not support the video tag.
                    </video>
                )}

                {ytVideo && (
                    <iframe
                        width="100%"
                        height="460"
                        src={toEmbedUrl(videoUrl)}
                        title={videoTitle || "Highlight video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>
        </Modal>
    );
};

export default VideoPlayer;
