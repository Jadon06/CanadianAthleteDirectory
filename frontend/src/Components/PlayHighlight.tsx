import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

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

    useEffect(() => {
        setVideoUrl(content);
        setVideoTitle(title)
        setYtVideo(content.includes("youtube"));
    }, [])

    return (
        <Modal show={show} onHide={onHide} centered dialogClassName="modal-glass">
            <Modal.Header closeButton>
                <Modal.Title>{videoTitle}</Modal.Title>
            </Modal.Header>
            {!ytVideo && <video 
                width="100%" 
                controls>
                <source 
                    src={videoUrl} 
                    
                    /> 
                Your browser does not support the video tag.
            </video>}

            {ytVideo && 
                <iframe
                    width="100%"
                    height="400"
                    src={videoUrl}
                    // title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />}
            {/* <div style={{ marginTop: '10px' }}>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
            </div> */}
        </Modal>
    );
    };

export default VideoPlayer;
