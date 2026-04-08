import { useNavigate } from "react-router-dom"
import { Button, Card, Container } from "react-bootstrap"
import { FaArrowRight, FaBolt, FaLayerGroup, FaPlay, FaShieldAlt, FaUserFriends, FaBasketballBall } from "react-icons/fa"
import { HiOutlineSparkles } from "react-icons/hi2"
import { GiWhistle } from "react-icons/gi"

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="app-shell hero-shell home-hero-shell">
            <Container fluid className="page-section">
                <div className="hero-grid">
                    <div>
                        <div className="eyebrow">
                            <HiOutlineSparkles />
                            Built for athletes who want connection, visibility, and opportunity
                        </div>

                        <h1 className="hero-title">Your athletic network, upgraded.</h1>
                        <p className="hero-copy">
                            Northern Athletics helps athletes turn hard work into <strong>opportunity</strong> and dreams into real <strong>possibilities</strong>.
                            Build a profile that feels like a scouting reel, a networking hub, and a message inbox in one place,
                            then share highlights, connect with teammates, and show up ready for the moments that <strong>matter</strong>.
                        </p>

                        <div className="cta-row">
                            <Button className="cta-button primary" onClick={() => navigate("/sign-up")}>
                                Join the network <FaArrowRight />
                            </Button>
                            <Button className="cta-button secondary" onClick={() => navigate("/login")}>
                                Sign in
                            </Button>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-value">1 profile</div>
                                <div className="stat-label">for stats, highlights, and contact details</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">24/7</div>
                                <div className="stat-label">discoverability for coaches, recruiters, and teammates</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">Fast</div>
                                <div className="stat-label">connections through messaging and search</div>
                            </div>
                        </div>

                        <div className="pill-row">
                            <span className="pill">Recruiting-ready</span>
                            <span className="pill">Highlight-first</span>
                            <span className="pill">Built for teams</span>
                            <span className="pill">Athlete-centered</span>
                        </div>

                        <Card className="surface-card" style={{ borderRadius: "28px", padding: "18px", marginTop: "24px", position: "relative" }}>
                            <div style={{ position: "absolute", top: "-20px", right: "8px", fontSize: "72px", color: "rgba(17, 34, 56, 0.5)", transform: "rotate(0deg)" }}>
                                <GiWhistle />
                            </div>
                            <div className="network-card-top">
                                <div>
                                    <div className="eyebrow" style={{ marginBottom: "10px" }}>
                                        <FaShieldAlt /> For scouts & coaches
                                    </div>
                                    <h3 style={{ marginBottom: "6px" }}>Scout smarter, recruit faster.</h3>
                                    <div className="network-meta">Find talent with complete profiles and real-time visibility.</div>
                                </div>
                            </div>

                            <div className="feature-grid" style={{ gridTemplateColumns: "1fr", gap: "12px" }}>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Verified talent pool</h3>
                                            <div className="network-meta">Access athlete profiles with stats, highlights, and contact info in one place.</div>
                                        </div>
                                        <FaUserFriends />
                                    </div>
                                </div>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Real performance data</h3>
                                            <div className="network-meta">Game-by-game stats and broadcast-quality highlights for accurate evaluation.</div>
                                        </div>
                                        <FaLayerGroup />
                                    </div>
                                </div>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Direct communication</h3>
                                            <div className="network-meta">Message athletes directly without middlemen. Fast, professional, and trackable.</div>
                                        </div>
                                        <FaBolt />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="hero-stack">
                        <Card className="spotlight-card">
                            <div className="section-heading" style={{ marginBottom: "14px" }}>
                                <div>
                                    <p className="eyebrow" style={{ marginBottom: "10px" }}>
                                        <FaPlay /> Trending highlights
                                    </p>
                                    <h2 className="section-title" style={{ fontSize: "2rem" }}>See the action first</h2>
                                </div>
                                <div className="network-meta">Curated from athlete clips and game tape</div>
                            </div>

                            <div className="spotlight-frame">
                                <iframe
                                    src="https://www.youtube.com/embed/R4nI6taCb0s?autoplay=1&mute=1&controls=0&loop=1&playlist=R4nI6taCb0s"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Trending athlete highlight"
                                />
                            </div>

                            <div className="spotlight-meta">
                                <div>
                                    <strong>Broadcast-ready profile media</strong>
                                    <div className="muted-copy">A cleaner way to package performance and personality.</div>
                                </div>
                                <Button className="ghost-button btn" onClick={() => navigate("/feed/")}>Explore feed</Button>
                            </div>
                        </Card>

                        <Card className="surface-card" style={{ borderRadius: "28px", padding: "18px", marginTop: "23px" }}>
                            <div className="network-card-top">
                                <div>
                                    <div className="eyebrow" style={{ marginBottom: "10px" }}>
                                        <FaBolt /> Live signal
                                    </div>
                                    <h3 style={{ marginBottom: "6px" }}>Stay visible without losing the locker-room feel</h3>
                                    <div className="network-meta">Fast, social, and built around sport-specific identity.</div>
                                </div>
                                <div className="network-avatar"><FaBasketballBall style={{ fontSize: "48px", color: "#A0522D" }} /></div>
                            </div>

                            <div className="feature-grid" style={{ gridTemplateColumns: "1fr", gap: "12px" }}>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Network search</h3>
                                            <div className="network-meta">Find athletes, coaches, and friends quickly.</div>
                                        </div>
                                        <FaUserFriends />
                                    </div>
                                </div>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Performance layers</h3>
                                            <div className="network-meta">Highlights, stats, and profile details in one view.</div>
                                        </div>
                                        <FaLayerGroup />
                                    </div>
                                </div>
                                <div className="network-card">
                                    <div className="network-card-top">
                                        <div>
                                            <h3>Trust and control</h3>
                                            <div className="network-meta">Built to keep your profile polished and secure.</div>
                                        </div>
                                        <FaShieldAlt />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div style={{ marginTop: "44px" }}>
                    <div className="section-heading">
                        <div>
                            <h2 className="section-title">Why athletes will actually use it</h2>
                            <p className="section-subtitle">
                                The design puts momentum first: strong first impression, simple actions, and a network feel that works on desktop and mobile.
                            </p>
                        </div>
                        <Button className="ghost-button btn" onClick={() => navigate("/sign-up")}>Start building your profile</Button>
                    </div>

                    <div className="feature-grid">
                        <Card className="feature-card">
                            <div className="feature-icon"><FaBolt /></div>
                            <h3>Sharp first impression</h3>
                            <p className="muted-copy">A high-contrast hero and bold typography make the app feel like a premium athlete platform.</p>
                        </Card>
                        <Card className="feature-card">
                            <div className="feature-icon"><FaUserFriends /></div>
                            <h3>Social, but focused</h3>
                            <p className="muted-copy">Networking, messaging, and discovery are framed around athlete relationships rather than generic social clutter.</p>
                        </Card>
                        <Card className="feature-card">
                            <div className="feature-icon"><FaShieldAlt /></div>
                            <h3>Recruiting-ready layout</h3>
                            <p className="muted-copy">The visual structure supports highlights, stats, and contact details so the app can grow into a real athlete showcase.</p>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}