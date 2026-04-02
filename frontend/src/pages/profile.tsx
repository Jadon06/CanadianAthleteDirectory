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

export default function profile(){
    const [isEditHeaderModalVisible, setIsEditHeaderModalVisible] = useState(false)
    const [isEditGameScheduleModalVisible, setIsEditGameScheduleModalVisible] = useState(false)
    const [isContactInfoVisible, setIsContactInfoVisible] = useState(false)
    const [isEditEducationVisible, setIsEditEducationVisible] = useState(false)
    const [searchData, setSearchData] = useState("")
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
            setHighlights(data)
        }
    }

    useEffect(() => {
        fetchUser();
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

    const handleHideModal = () => {
        setIsEditHeaderModalVisible(false)
        setIsContactInfoVisible(false)
        setIsEditEducationVisible(false)
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
                Analytics={handleClickAnalytics}
                Name={userData?.first_name + " " + userData?.last_name}
                Position={userData?.postiton + " "}

            />
            <ContactInfo
                show={isContactInfoVisible}
                onHide={handleHideModal}
            />

            <HighlightsBody highlights={highlights} />
        </>
    );
}