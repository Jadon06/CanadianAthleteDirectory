import { Button, Card, Container } from 'react-bootstrap';
import { FiEdit2 } from 'react-icons/fi';
import { FaBinoculars } from 'react-icons/fa';
import { GiTShirt, GiWhistle } from 'react-icons/gi';

interface ProfileHeaderProps {
    ProfilePic: string;
    UserType: string;
    Name: string;
    Bio: string;
    Age: string;
    Position: string;
    Height: string;
    Weight: string;
    School: string;
    Contact: () => void;
    Connect: () => void;
    Analytics: () => void;
    Connections: () => void;
    CanEditProfile: boolean;
    EditProfile: () => void;
    CreateHighlight: () => void;
}

export default function ProfileHeader({ ProfilePic, UserType, Name, Bio, Age, Position, Height, Weight, School, Contact, Connect, Analytics, Connections, CanEditProfile, EditProfile, CreateHighlight } : ProfileHeaderProps) {
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
    const normalizedUserType = (UserType || '').toLowerCase()
    const userTypeLabel = normalizedUserType
        ? normalizedUserType.charAt(0).toUpperCase() + normalizedUserType.slice(1)
        : 'User'

    const userTypeIcon = (() => {
        if (normalizedUserType === 'coach') {
            return <GiWhistle />
        }
        if (normalizedUserType === 'athlete') {
            return <GiTShirt />
        }
        if (normalizedUserType === 'scout') {
            return <FaBinoculars />
        }
        return null
    })()

    return (
        <Container className="profile-hero-grid page-section" style={{ marginTop: "14px" }}>
            <Card className="profile-avatar-card">
                <div className="eyebrow" style={{ marginBottom: "12px" }}>Athlete profile</div>
                <div className="profile-avatar-figure">
                    <img src={ProfilePic || "nopfp_img.jpg"} alt={Name || "Athlete profile"} />
                </div>
                {userTypeIcon && (
                    <div className="profile-user-type-badge" aria-label={`${normalizedUserType} icon`} title={userTypeLabel}>
                        {userTypeIcon}
                    </div>
                )}
            </Card>

            <Card className="profile-meta-card profile-meta-card-editable">
                {CanEditProfile && (
                    <button
                        type="button"
                        className="profile-edit-icon-button"
                        onClick={EditProfile}
                        aria-label="Edit profile"
                        title="Edit profile"
                    >
                        <FiEdit2 />
                    </button>
                )}

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

                <div className="profile-bio-slot" aria-label="Bio placeholder">
                    <div className="profile-bio-title">Bio</div>
                    <div className="muted-copy">{Bio || "Add a short athlete bio."}</div>
                </div>

                <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                    <div className="stat-card"><div className="stat-value">{Height || "0ft"}</div><div className="stat-label">Height</div></div>
                    <div className="stat-card"><div className="stat-value">{Weight || "0lbs"}</div><div className="stat-label">Weight</div></div>
                    <div className="stat-card"><div className="stat-value">{Age || "0"}</div><div className="stat-label">Age</div></div>
                </div>

                <div className="profile-badge-row" style={{ marginTop: "12px" }}>
                    <span className="profile-stat-chip">{School || "School"}</span>
                </div>

                <div className="profile-action-row" style={{ marginTop: "12px" }}>
                    {!CanEditProfile && (
                        <Button className="ghost-button btn" onClick={Connect}>Connect</Button>
                    )}
                    <Button className="ghost-button btn" onClick={Connections}>Connections</Button>
                    <Button className="ghost-button btn" onClick={Contact}>Contact</Button>
                    <Button className="ghost-button btn" onClick={Analytics}>Analytics</Button>
                    {CanEditProfile && (
                        <Button className="action-button btn" onClick={CreateHighlight}>+ Add Highlight</Button>
                    )}
                </div>
            </Card>
        </Container>
    );
}