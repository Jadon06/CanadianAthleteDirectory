import { Button, Card } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Results() {
    const navigate = useNavigate()

    return (
        <div className="empty-shell">
            <div className="empty-grid">
                <div>
                    <div className="eyebrow" style={{ marginBottom: "14px" }}>
                        <FaSearch /> Search results
                    </div>
                    <h1 className="empty-title">Search should feel fast and athletic.</h1>
                    <p className="empty-copy" style={{ marginBottom: "22px" }}>
                        This screen is a strong place for player cards, filters, and discovery rows once the data layer is wired in.
                    </p>
                    <div className="cta-row">
                        <Button className="action-button btn" onClick={() => navigate("/feed/")}>Explore feed</Button>
                        <Button className="ghost-button btn" onClick={() => navigate("/")}>Back home</Button>
                    </div>
                </div>

                <Card className="surface-card empty-panel">
                    <h3>Discovery layout</h3>
                    <div className="muted-copy">
                        Use this space for athlete cards, filters, and search refinement when results arrive from the backend.
                    </div>
                </Card>
            </div>
        </div>
    );
}