import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { FaUserFriends, FaSearch } from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import "../App.css"
import EditHeaderProfile from '../Components/EditHeaderModal.tsx';
import EditUpcomingEvents from '../Components/EditUpcomingEvents.tsx';
import ContactInfo from '../Components/ContactInfoModal.tsx';
import CustomNavBar from '../Components/NavigationBar.tsx';
import ProfileHeader from '../Components/ProfileHeader.tsx';
import HighlightsBody from '../Components/HighlightsBody.tsx';
import type { Highlight } from '../Components/HighlightsBody.tsx';
import type { OverallStatData } from '../Components/AnalyticsHeader.tsx';
import CreateHighlightModal from '../Components/CreateHighlightModal.tsx';
import { useTheme } from '@emotion/react';

export default function profile(){
    const [isEditHeaderModalVisible, setIsEditHeaderModalVisible] = useState(false)
    const [isEditGameScheduleModalVisible, setIsEditGameScheduleModalVisible] = useState(false)
    const [isContactInfoVisible, setIsContactInfoVisible] = useState(false)
    const [isEditEducationVisible, setIsEditEducationVisible] = useState(false)
    const [searchData, setSearchData] = useState("")
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
        navigate("/")
    }

    const handleClickMessages = () => {
        navigate("/messages")
    }

    const handleClickNotifications = () => {
        navigate("/notifications")
    }

    const handleClickDashboard = () => {
        navigate("/dashboard")
    }

    const handleClickAnalytics = () => {
        navigate("/analytics")
    }

    const runSearch = async(data: string) => {
        const response = await fetch("")
    }

    const handleClickSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the pressed key is 'Enter'
        if (event.key == 'Enter') {
            navigate("/search-results")
        }   
    }

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        runSearch(value); // fire async logic without returning a Promise
    };

    const handleShowContactModal = () => {
        setIsContactInfoVisible(true)
    }

    const handleShowHighlightsModal = () => {
        setCreateHighlightModalVisible(true)
    }

    const handleHideModal = () => {
        setIsEditHeaderModalVisible(false)
        setIsContactInfoVisible(false)
        setIsEditEducationVisible(false)
        setCreateHighlightModalVisible(false)
        fetchUser();
    }

    return (
        <>
            <CustomNavBar 
                handleClickHome={handleClickHome}
                handleClickMsgs={handleClickMessages}
                handleClickSearch={handleClickSearch}
                handleClickNotifications={handleClickNotifications}
                handleChangeSearch={handleChangeSearch}
                handleClickDashboard={handleClickDashboard}
            />
            
            <ProfileHeader 
                Contact={handleShowContactModal}
                Connect={() => {}}
                Analytics={handleClickAnalytics}
                CreateHighlight={handleShowHighlightsModal}
                ProfilePic={""}
                Age={""}
                Name={userData?.first_name + " " + userData?.last_name}
                Position={"Position: " + overallData.position + " "}
                Height={""}
                Weight={""}
                PPG={overallData.Points_per_game + " "}
                Assists={overallData.Assists + " "}
                Rebounds={overallData.Rebounds_per_game + " "}
                FieldGoal={overallData.FG_Pct + "%"}
                School={""}

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
        </>
    );
}