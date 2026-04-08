import { Button, Card, Container } from 'react-bootstrap';

interface ProfileHeaderProps {
    ProfilePic: string;
    Name: string;
    Age: string;
    Position: string;
    Height: string;
    Weight: string;
    School: string;
    Contact: () => void;
    Connect: () => void;
    Analytics: () => void;
    CreateHighlight: () => void;
}

export default function ProfileHeader({ ProfilePic, Name, Age, Position, Height, Weight, School, Contact, Connect, Analytics, CreateHighlight } : ProfileHeaderProps) {
    const schoolIcons: Record<string, string> = {
        "Acadia University": "https://upload.wikimedia.org/wikipedia/en/0/06/Acadia_University_Coat_of_Arms_2017.jpg",
        "Dalhousie University": "DalhousieIcon.jpeg",
        "Memorial University of Newfoundland": "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Memorial_University_of_Newfoundland_CoA.svg/1280px-Memorial_University_of_Newfoundland_CoA.svg.png",
        "Mount Allison University": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Mount_allison_athletics_monogram.png",
        "Saint Mary's University": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9obP2aOsscvZMF4gF001rGZqHdyug4SPzg&s",
        "St. Francis Xavier University": "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/1b7c0c959fa0b13da6ca2c7fb707dac2",
        "St. Thomas University": "https://www.stu.ca/media/stu/site-content/about/coat-of-arms.jpg",
        "Université de Moncton": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1AKxej5tJsQTJWtwJJVAT6cN4MxK_WGBoYA&s",
        "University of New Brunswick (UNB)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMKCG7E-2n09Jrh4fBGUfqVFbZcm5JiQUu0Q&s",
        "University of Prince Edward Island (UPEI)": "https://images.squarespace-cdn.com/content/v1/597102da2e69cf32c2bb021f/1561482190390-0Q6FMWYWHGLPUZIZQEFE/UPEI+-+Fathom_Studio.png?format=1000w"
    }
    
    const schoolIcon = schoolIcons[School] ?? "nopfp_img.jpg"

    return (
        <Container className="profile-hero-grid page-section" style={{ marginTop: "14px" }}>
            <Card className="profile-avatar-card">
                <div className="eyebrow" style={{ marginBottom: "12px" }}>Athlete profile</div>
                <div className="profile-avatar-figure">
                    <img src={ProfilePic || "nopfp_img.jpg"} alt={Name || "Athlete profile"} />
                </div>
            </Card>

            <Card className="profile-meta-card">
                <div className="section-heading" style={{ marginBottom: "10px" }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "8px" }}>Recruiting-ready</div>
                        <h1 className="section-title" style={{ marginBottom: "8px" }}>{Name || "Athlete Name"}</h1>
                        <div className="network-meta">{Position || "Position"}</div>
                    </div>
                    <div className="network-avatar">
                        <img src={schoolIcon} alt={School || "School"} title={School || "School"} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "16px" }} />
                    </div>
                </div>

                <p className="hero-copy" style={{ marginBottom: "12px" }}>
                    A modern athlete profile should read like a portfolio: clear identity, strong stats, and fast actions for people who want to connect.
                </p>

                <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                    <div className="stat-card"><div className="stat-value">{Height || "0ft"}</div><div className="stat-label">Height</div></div>
                    <div className="stat-card"><div className="stat-value">{Weight || "0lbs"}</div><div className="stat-label">Weight</div></div>
                    <div className="stat-card"><div className="stat-value">{Age || "0"}</div><div className="stat-label">Age</div></div>
                </div>

                <div className="profile-badge-row" style={{ marginTop: "12px" }}>
                    <span className="profile-stat-chip">{School || "School"}</span>
                </div>

                <div className="profile-action-row" style={{ marginTop: "12px" }}>
                    <Button className="ghost-button btn" onClick={Connect}>Connect</Button>
                    <Button className="ghost-button btn" onClick={Contact}>Contact</Button>
                    <Button className="ghost-button btn" onClick={Analytics}>Analytics</Button>
                    <Button className="action-button btn" onClick={CreateHighlight}>+ Add Highlight</Button>
                </div>
            </Card>
        </Container>
    );
}