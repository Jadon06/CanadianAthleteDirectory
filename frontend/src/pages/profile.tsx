import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "../App.css"
import ContactInfo from '../Components/ContactInfoModal.tsx';
import CustomNavBar from '../Components/NavigationBar.tsx';
import ProfileHeader from '../Components/ProfileHeader.tsx';
import HighlightsBody from '../Components/HighlightsBody.tsx';
import type { Highlight } from '../Components/HighlightsBody.tsx';
import type { OverallStatData } from '../Components/AnalyticsHeader.tsx';
import CreateHighlightModal from '../Components/CreateHighlightModal.tsx';

export default function profile(){
    const [isContactInfoVisible, setIsContactInfoVisible] = useState(false)
    const [isCreateHighlightModalVisible, setCreateHighlightModalVisible] = useState(false)

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
        middle_name: string;
        last_name: string;
        headline: string;
        phone_number: string;
        email: string;
        postiton: string;
        height: string;
        weight: string;
        age: string;
        school: string;
    } | null>(null);
    const [highlights, setHighlights] = useState<Highlight[]>([])

    const navigate = useNavigate()

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

    const handleClickDashboard = () => navigate("/dashboard")

    const handleClickAnalytics = () => {
        navigate("/analytics")
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

    const handleHideModal = () => {
        setIsContactInfoVisible(false)
        setCreateHighlightModalVisible(false)
        fetchUser();
    }

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
                        <h1 className="section-title">A polished home base for your athletic identity.</h1>
                    </div>
                    <p className="section-subtitle">Your profile, highlights, and stats now live inside a more premium layout.</p>
                </div>
            </Container>

            <ProfileHeader 
                Contact={handleShowContactModal}
                Connect={() => {}}
                Analytics={handleClickAnalytics}
                CreateHighlight={handleShowHighlightsModal}
                ProfilePic={""}
                Age={userData?.age + " "}
                Name={userData?.first_name + " " + userData?.last_name}
                Position={"Position: " + overallData.position + " "}
                Height={userData?.height + "cm"}
                Weight={userData?.weight + "lbs"}
                School={userData?.school + ""}

            />
            <ContactInfo
                show={isContactInfoVisible}
                onHide={handleHideModal}
            />

            <CreateHighlightModal
                show={isCreateHighlightModalVisible}
                onHide={handleHideModal}
            />

            <HighlightsBody 
                highlights={highlights} 
            />
        </div>
    );
}