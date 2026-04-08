import { Button, Card, Container } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomNavBar from '../Components/NavigationBar.tsx';
import type { ChangeEvent, KeyboardEvent } from 'react';

export default function feed() {
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate("/feed")
    }

    const handleClickMessages = () => {
        navigate("/messages")
    }

    const handleClickNotifications = () => {
        navigate("/notifications")
    }

    const handleClickDashboard = () => navigate("/dashboard")

    const handleClickSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            navigate("/search-results")
        }
    }

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        void event.target.value;
    };

    return (
        <div className="app-shell hero-shell">
            <CustomNavBar
                handleClickHome={handleClickHome}
                handleClickMsgs={handleClickMessages}
                handleClickSearch={handleClickSearch}
                handleClickNotifications={handleClickNotifications}
                handleChangeSearch={handleChangeSearch}
                handleClickDashboard={handleClickDashboard}
            />

            <Container className="page-section" style={{ paddingTop: "30px", paddingBottom: "50px" }}>
                <div className="section-heading">
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "12px" }}>
                            <FaPlay /> Recommended feed
                        </div>
                        <h1 className="section-title">A social feed that feels like sport, not noise.</h1>
                    </div>
                    <p className="section-subtitle">Recommended clips, athletes, and updates can live in a high-contrast feed with stronger hierarchy.</p>
                </div>

                <div style={{ display: "grid", gap: "18px" }}>
                    <Card className="surface-card" style={{ borderRadius: "28px", padding: "18px" }}>
                        <div className="network-card-top">
                            <div>
                                <h3>Featured athlete story</h3>
                                <div className="network-meta">A modern feed card with a strong media preview and action bar.</div>
                            </div>
                            <span className="pill">Live</span>
                        </div>
                        <div className="spotlight-frame" style={{ marginBottom: "16px" }}>
                            <iframe
                                src="https://www.youtube.com/embed/R4nI6taCb0s?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Featured athlete story"
                            />
                        </div>
                        <Card.Body style={{ padding: 0 }}>
                            <Card.Text className="muted-copy">Use this card pattern for highlights, posts, and updates from across the network.</Card.Text>
                            <div className='d-flex flex-wrap gap-2'>
                                <Button className='ghost-button btn'>Comment</Button>
                                <Button className='ghost-button btn'>Like</Button>
                                <Button className='ghost-button btn'>Repost</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}