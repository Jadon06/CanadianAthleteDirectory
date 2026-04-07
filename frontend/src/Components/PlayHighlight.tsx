import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';

export interface VideoPlayerProps {
    content: string;
    title: string;
    show: boolean;
    onHide: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, title, show, onHide }) => {
    // Define the ref with the correct TypeScript type
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState("")
    const [fullScreen, setFullScreen] = useState(false)
    const [ytVideo, setYtVideo] = useState(false)
    const [videoTitle, setVideoTitle] = useState("")

    const CheckYT = () => {
        if (content.includes("youtube")) {
            setYtVideo(true)
        }
    }

    useEffect(() => {
        console.log(content)
        setVideoUrl(content);
        setVideoTitle(title)
        CheckYT();
    }, [])

    const handlePlay = () => {
        videoRef.current?.play();
    };

    const handlePause = () => {
        videoRef.current?.pause();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{videoTitle}</Modal.Title>
            </Modal.Header>
            {!ytVideo && <video 
                ref={videoRef} 
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
