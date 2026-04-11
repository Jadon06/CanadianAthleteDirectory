import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AnalyticsBody from '../Components/AnalyticsBody';
import AnalyticsHeader from '../Components/AnalyticsHeader';
import CustomNavBar from '../Components/NavigationBar';
import type { StatData, OverallStatData } from '../Components/AnalyticsHeader';
import { navigateToOwnDashboard } from '../utils/dashboardRoute';
import { apiUrl } from '../utils/api';

const defaultData = {
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
}

const defaultStatData = {
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
}

export default function Analytics() {
    const [statData, setStatData] = useState<StatData>(defaultStatData)

    const [overallStatData, setOverallStatData] = useState<OverallStatData>(defaultData)
    const navigate = useNavigate()

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

    const handleClickSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Check if the pressed key is 'Enter'
        if (event.key == 'Enter') {
            navigate("/search-results")
        }   
    }

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        void value;
    };

    const toNumbers = (arr?: string[]) =>
        arr ? arr.map(v => Number(v) || 0) : [0];

    const fetchStats = async() => {
        const response = await fetch(apiUrl('/stats/game_stats/'), {
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

    const fetchOverallStats = async() => {
        const response = await fetch(apiUrl('/stats/overall_stats/'), {
            method: "GET",
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            const parsed_data = {
                ...data,
                first_name: data.first_name,
                last_name: data.last_name,
                position: data.position,
                Games: Number(data.Games),
                Games_started: Number(data.Games_started),
                Minutes: Number(data.Minutes),
                Minutes_per_game: Number(data.Minutes_per_game),
                FG: data.FG,
                FG_Pct: Number(data.FG_Pct),
                threePT: data.threePT,
                threePT_Pct: Number(data.threePT_Pct),
                FT: data.FT,
                FT_Pct: Number(data.FT_Pct),
                Off_rebounds: Number(data.Off_rebounds),
                Def_rebounds: Number(data.Def_rebounds),
                Total_rebounds: Number(data.Total_rebounds),
                Rebounds_per_game: Number(data.Rebounds_per_game),
                Personal_fouls: Number(data.Personal_fouls),
                Disqualifications: Number(data.Disqualifications),
                Assists: Number(data.Assists),
                Turnovers: Number(data.Turnovers),
                Assist_to_turnover_ratio: Number(data.Assist_to_turnover_ratio),
                Steals: Number(data.Steals),
                Blocks: Number(data.Blocks),
                Points: Number(data.Points),
                Points_per_game: Number(data.Points_per_game),
                Points_per_40_min: Number(data.Points_per_40_min),
            }
            setOverallStatData(parsed_data)
            console.log("parsed and set")
        }
        else {
            console.log("failed")
        }
    }

    useEffect(() => {
        setOverallStatData(defaultData);
        setStatData(defaultStatData);
        fetchStats();
        fetchOverallStats();
    }, [])

    return (
        <div className="app-shell hero-shell">
            <CustomNavBar 
                handleClickHome={handleClickHome}
                handleClickMsgs={handleClickMessages}
                handleClickSearch={handleClickSearch}
                handleClickNotifications={handleClickNotifications}
                handleClickDashboard={handleClickDashboard}
                handleChangeSearch={handleChangeSearch}
                />

            <Container className="page-section" style={{ paddingTop: "30px" }}>
                <div className="section-heading">
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "10px" }}>Analytics</div>
                        <h1 className="section-title">Track performance with a sharper dashboard.</h1>
                    </div>
                    <p className="section-subtitle">A cleaner analytics experience for season stats, trends, and scouting-level comparisons.</p>
                </div>
            </Container>

            <AnalyticsHeader 
                data={statData}
                overallData={overallStatData}
                />
            <AnalyticsBody 
                overallData={overallStatData} 
                />
        </div>
    );
}