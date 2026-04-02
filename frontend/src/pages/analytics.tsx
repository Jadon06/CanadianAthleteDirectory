import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AnalyticsBody from '../Components/AnalyticsBody';
import AnalyticsHeader from '../Components/AnalyticsHeader';
import CustomNavBar from '../Components/NavigationBar';
import type { StatData, statDataProp } from '../Components/AnalyticsHeader';
import type { ViewFiltersProp } from '../Components/LineGraphFiltersModal';

export default function Analytics() {
    const [statData, setStatData] = useState<StatData>({
        first_name: ["None"],
        last_name: ["None"],
        game_date: ["none"],
        ast: [0],
        blk: [0],
        dreb: [0],
        fgm_a: ["none"],
        ftm_a: [0],
        min: [0],
        oreb: [0],
        pf: [0],
        pts: [0],
        reb: [0],
        stl: [0],
        threpm_a: ["none"],
        to_: [0]
    })
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    const navigate = useNavigate()

    const handleClickHome = () => {
        navigate("/")
    }

    const handleClickMessages = () => {
        navigate("/messages")
    }

    const handleClickNotifications = () => {
        navigate("/notifications")
    }

    const runSearch = async(data: string) => {
        const response = await fetch("")
    }

    const handleClickDashboard = () => {
        navigate("/dashboard")
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

    const handleShowFiltersModal = () => {
        setShowFiltersModal(true)
    }

    const toNumbers = (arr?: string[]) =>
        arr ? arr.map(v => Number(v) || 0) : [0];

    const fetchStats = async() => {
        const response = await fetch("http://localhost:8001/stats/game_stats/", {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            let data = await response.json()
            // console.log(data)
            const parsedData = {
                ...data,
                pts: toNumbers(data.pts),
                ast: toNumbers(data.ast),
                reb: toNumbers(data.reb),
                stl: toNumbers(data.stl),
                blk: toNumbers(data.blk),
                dreb: toNumbers(data.dreb),
                ftm_a: toNumbers(data.ftm_a),
                min: toNumbers(data.min),
                oreb: toNumbers(data.oreb),
                pf: toNumbers(data.pf),
                to_: toNumbers(data.to_),

                fgm_a: data.fgm_a,
                threpm_a: data.threpm_a,
                game_date:  data.game_date
            };

            setStatData(parsedData)
        }
        else {
            console.log("failed")
        }
    }

    useEffect(() => {
        fetchStats()
        console.log(statData)
    }, [statData])

    return (
        <>
        <CustomNavBar 
            handleClickHome={handleClickHome}
            handleClickMsgs={handleClickMessages}
            handleClickSearch={handleClickSearch}
            handleClickNotifications={handleClickNotifications}
            handleClickDashboard={handleClickDashboard}
            handleChangeSearch={handleChangeSearch}
            />
        <AnalyticsHeader 
            data={statData}
            />
        <AnalyticsBody data={statData} />
        </>
    );
}