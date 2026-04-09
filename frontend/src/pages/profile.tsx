import { Container } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "../App.css"
import ContactInfo from '../Components/ContactInfoModal.tsx';
import CustomNavBar from '../Components/NavigationBar.tsx';
import ProfileHeader from '../Components/ProfileHeader.tsx';
import HighlightsBody from '../Components/HighlightsBody.tsx';
import type { Highlight } from '../Components/HighlightsBody.tsx';
import type { OverallStatData } from '../Components/AnalyticsHeader.tsx';
import CreateHighlightModal from '../Components/CreateHighlightModal.tsx';
import EditProfileModal, { type EditProfileFormData } from '../Components/EditProfileModal.tsx';
import { buildDashboardPath, navigateToOwnDashboard, usernameFromFullName } from '../utils/dashboardRoute';

export default function profile(){
    const [isContactInfoVisible, setIsContactInfoVisible] = useState(false)
    const [isCreateHighlightModalVisible, setCreateHighlightModalVisible] = useState(false)
    const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false)
    const [editedProfileData, setEditedProfileData] = useState<EditProfileFormData | null>(null)

    const [overallData, setOverallData] = useState<OverallStatData>({
        first_name: "",
        last_name: "",
        position: "",
        Games: 0,
        Games_started: 0,
        Minutes: 0,
        Minutes_per_game: 0,
        FG: "",
        FG_Pct: 0,
        threePT: "",
        threePT_Pct: 0,
        FT: "",
        FT_Pct: 0,
        Off_rebounds: 0,
        Def_rebounds: 0,
        Total_rebounds: 0,
        Rebounds_per_game: 0,
        Personal_fouls: 0,
        Disqualifications: 0,
        Assists: 0,
        Turnovers: 0,
        Assist_to_turnover_ratio: 0,
        Steals: 0,
        Blocks: 0,
        Points: 0,
        Points_per_game: 0,
        Points_per_40_min: 0,
    })
    const [userData, setUserData] = useState<{
        first_name: string;
        full_name: string;
        last_name: string;
        headline: string;
        phone_number: string;
        email: string;
        position: string;
        height: string;
        weight: string;
        age: string;
        school: string;
        profile_picture: string;
        user_type: string;
        bio: string;
    } | null>(null);
    const [highlights, setHighlights] = useState<Highlight[]>([])

    const profileModalInitialData: EditProfileFormData = {
        profile_picture: editedProfileData?.profile_picture ?? userData?.profile_picture ?? "",
        height: editedProfileData?.height ?? userData?.height ?? "",
        weight: editedProfileData?.weight ?? userData?.weight ?? "",
        school: editedProfileData?.school ?? userData?.school ?? "",
        position: editedProfileData?.position ?? overallData.position ?? "",
        bio: editedProfileData?.bio ?? userData?.headline ?? ""
    }

    const navigate = useNavigate()
    const location = useLocation()
    const { username } = useParams<{ username: string }>()
    const viewedProfileEmailFromState = (location.state as { profileEmail?: string } | null)?.profileEmail
    const ownUsername = usernameFromFullName(userData?.full_name || `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim())
    const canEditProfile = (!username || username === ownUsername) && (!viewedProfileEmailFromState || viewedProfileEmailFromState === userData?.email)

    const fetchUser = async() => {
        const response = await fetch('http://localhost:8001/users/me/', {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            let data = await response.json();
            setUserData(data)
            console.log(data)
        }
    }

    const fetchHighlights = async() => {
        const response = await fetch("http://localhost:8001/highlights/", {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            let data = await response.json();
            console.log(data)
            setHighlights(data)
        }
        else{
            console.log("highlight retrieval failed")
        }
    }

    const fetchOverallStats = async() => {
        const response = await fetch("http://localhost:8001/stats/overall_stats/", {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            setOverallData(data)
            console.log("parsed and set")
        }
        else {
            console.log("failed")
        }
    }

    useEffect(() => {
        fetchUser();
        fetchOverallStats();
        fetchHighlights();
    }, []);

    const handleClickHome = () => {
        navigate("/feed")
    }

    const handleClickMessages = () => {
        navigate("/messages")
    }

    const handleClickNotifications = () => {
        navigate("/notifications")
    }

    const handleClickDashboard = () => {
        void navigateToOwnDashboard(navigate)
    }

    const handleClickAnalytics = () => {
        navigate("/analytics")
    }

    const handleClickConnections = () => {
        navigate("/connections")
    }

    const handleClickSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the pressed key is 'Enter'
        if (event.key == 'Enter') {
            navigate("/search-results")
        }   
    }

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        void event.target.value;
    };

    const handleShowContactModal = () => {
        setIsContactInfoVisible(true)
    }

    const handleShowHighlightsModal = () => {
        setCreateHighlightModalVisible(true)
    }

    const handleShowEditProfileModal = () => {
        setEditProfileModalVisible(true)
    }

    const handleSaveEditedProfile = (data: EditProfileFormData) => {
        // The edited profile form values are stored here for UI preview and API wiring.
        setEditedProfileData(data)

        setOverallData((prev) => ({
            ...prev,
            position: data.position || prev.position
        }))

        setUserData((prev) => {
            if (!prev) {
                return prev
            }

            return {
                ...prev,
                headline: data.bio,
                profile_picture: data.profile_picture,
                height: data.height,
                weight: data.weight,
                school: data.school
            }
        })
    }

    const handleHideContactModal = () => {
        setIsContactInfoVisible(false)
    }

    const handleHideHighlightModal = () => {
        setCreateHighlightModalVisible(false)
        fetchUser();
        fetchHighlights();
    }

    const handleHideEditProfileModal = () => {
        setEditProfileModalVisible(false)
    }

    useEffect(() => {
        if (username && ownUsername && username === 'me') {
            navigate(buildDashboardPath(ownUsername), { replace: true })
        }
    }, [navigate, ownUsername, username])

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

            <Container className="page-section" style={{ paddingTop: "18px" }}>
                <div className="section-heading">
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "10px" }}>Profile</div>
                    </div>
                </div>
            </Container>

            <ProfileHeader 
                Contact={handleShowContactModal}
                Connect={() => {}}
                Analytics={handleClickAnalytics}
                Connections={handleClickConnections}
                CanEditProfile={canEditProfile}
                EditProfile={handleShowEditProfileModal}
                CreateHighlight={handleShowHighlightsModal}
                ProfilePic={profileModalInitialData.profile_picture || ""}
                UserType={userData?.user_type || "other"}
                Bio={userData?.bio || ""}
                Age={userData?.age + " "}
                Name={userData?.first_name + " " + userData?.last_name}
                Position={"Position: " + userData?.position + " "}
                Height={profileModalInitialData.height ? profileModalInitialData.height + "cm" : ""}
                Weight={profileModalInitialData.weight ? profileModalInitialData.weight + "lbs" : ""}
                School={profileModalInitialData.school + ""}

            />
            <ContactInfo
                show={isContactInfoVisible}
                onHide={handleHideContactModal}
            />

            <CreateHighlightModal
                show={isCreateHighlightModalVisible}
                onHide={handleHideHighlightModal}
            />

            <EditProfileModal
                show={isEditProfileModalVisible}
                onHide={handleHideEditProfileModal}
                initialData={profileModalInitialData}
                onSave={handleSaveEditedProfile}
            />

            <HighlightsBody 
                highlights={highlights} 
            />
        </div>
    );
}