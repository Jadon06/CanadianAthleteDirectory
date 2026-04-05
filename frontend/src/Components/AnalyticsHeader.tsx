import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Unstable_RadarChart as RadarChart } from '@mui/x-charts';

import { CiSliderHorizontal } from "react-icons/ci";
import FiltersModal from './LineGraphFiltersModal';
import { useState } from 'react';
import { Typography } from '@mui/material';

export interface StatData {
    first_name: string[];
    last_name: string[];
    game_date: string[];
    ast: number[];
    blk: number[];
    dreb: number[];
    fgm_a: string[];
    ftm_a: number[];
    min: number[];
    oreb: number[];
    pf: number[];
    pts: number[];
    reb: number[];
    stl: number[];
    threpm_a: string[];
    to_: number[];
}

export interface OverallStatData {
    first_name: string;
    last_name: string;
    position: string;
    Games: number;
    Games_started: number;
    Minutes: number;
    Minutes_per_game: number;
    FG: string;
    FG_Pct: number;
    threePT: string;
    threePT_Pct: number;
    FT: string;
    FT_Pct: number;
    Off_rebounds: number;
    Def_rebounds: number;
    Total_rebounds: number;
    Rebounds_per_game: number;
    Personal_fouls: number;
    Disqualifications: number;
    Assists: number;
    Turnovers: number;
    Assist_to_turnover_ratio: number;
    Steals: number;
    Blocks: number;
    Points: number;
    Points_per_game: number;
    Points_per_40_min: number;
}

export interface PreviousSeasonOverallStats extends OverallStatData {
    
}

export interface statDataProp {
    data: StatData;
    overallData: OverallStatData;
}

export default function AnalyticsHeader({ data, overallData } : statDataProp) {
    const [showFiltersModal, setShowFiltersModal] = useState(false)
    const full_name = `${overallData.first_name} ${overallData.last_name}, ${overallData.position}`;

    const handleHideModal = () => {
        setShowFiltersModal(false)
    }

    return (
        <div className="d-flex flex-row justify-content-start" style={{height: "400px", width: "1200px", border: "1px solid black", position: "relative"}}>
            <div style={{marginLeft: "20px", marginTop: "30px"}}>
                <RadarChart
                    height={300}
                    series={[{ label: full_name, 
                        data: [overallData.FG_Pct, overallData.threePT_Pct, overallData.FT_Pct, 
                            overallData.Rebounds_per_game, overallData.Assists, overallData.Blocks] }]}
                    radar={{
                        max: 100,
                        metrics: ['Fg%', '3pt%', 'Ft%', 'Rpg', 'Asts', 'Blks'],
                    }}
                />
            </div>
            
            <LineChart
                sx={{ width: '100%' }}
                series={[
                    { data: data?.pts ?? [0], label: 'pts', yAxisId: 'ptsID' },
                    { data: data?.ast ?? [0], label: 'asts', yAxisId: 'astsID' },
                    { data: data?.reb ?? [0], label: 'asts', yAxisId: 'rebID' },
                ]}
                xAxis={[{ scaleType: 'point', data: data.game_date, height: 28 }]}
                yAxis={[
                    { id: 'ptsID', width: 50 },
                    { id: 'astsID', position: 'none' },
                    { id: 'rebID', position: "right" },
                ]}
                slotProps={{
                    legend: {
                        direction: "vertical",   // stack vertically
                        position: {
                            vertical: 'middle',
                            horizontal: "end",
                        },
                    },
                }}
            />
            <div style={{ height: "auto", width: "100px", 
                    marginTop: "10px", right: "0px", zIndex: 10, position: "absolute"}}>
                <Button onClick={() => setShowFiltersModal(true)} className="filter btn" style={{height: "30px", display: "flex",
                    alignItems: "center", justifyContent: "center", gap: "2px"}}>
                    filters
                    <CiSliderHorizontal 
                        style={{cursor: "pointer", height: "20px", width: "20px"}}
                    />
                </Button>
            </div>

            <FiltersModal show={showFiltersModal} onHide={handleHideModal} />
        </div>
    );
}