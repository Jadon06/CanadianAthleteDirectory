import { Button, Card, Container } from 'react-bootstrap';
import { LineChart } from '@mui/x-charts/LineChart';
import { Unstable_RadarChart as RadarChart } from '@mui/x-charts';

import { CiSliderHorizontal } from "react-icons/ci";
import FiltersModal from './LineGraphFiltersModal';
import { useState } from 'react';

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
        <Container className="page-section" style={{ marginTop: "28px" }}>
            <Card className="analytics-hero-card">
                <div className="section-heading" style={{ marginBottom: "18px" }}>
                    <div>
                        <div className="eyebrow" style={{ marginBottom: "10px" }}>Performance view</div>
                        <h2 className="section-title">Analytics that feel premium and readable.</h2>
                        <p className="section-subtitle">A compact visual summary for recruiters, coaches, and athletes tracking progress.</p>
                    </div>
                    <Button onClick={() => setShowFiltersModal(true)} className="ghost-button btn">
                        Filters <CiSliderHorizontal />
                    </Button>
                </div>

                <div className="analytics-grid">
                    <Card className="analytics-chart-card">
                        <div className="eyebrow" style={{ marginBottom: "12px" }}>Overall Stats</div>
                        <RadarChart
                            height={320}
                            series={[{ label: full_name, data: [overallData.FG_Pct, overallData.threePT_Pct, overallData.FT_Pct, overallData.Rebounds_per_game, overallData.Assists, overallData.Blocks] }]}
                            radar={{
                                max: 100,
                                metrics: ['Fg%', '3pt%', 'Ft%', 'Rpg', 'Asts', 'Blks'],
                            }}
                        />
                    </Card>

                    <Card className="analytics-chart-card">
                        <div className="eyebrow" style={{ marginBottom: "12px" }}>Recent games</div>
                        <LineChart
                            sx={{ width: '100%' }}
                            series={[
                                { data: data?.pts ?? [0], label: 'Pts', yAxisId: 'ptsID' },
                                { data: data?.ast ?? [0], label: 'Asts', yAxisId: 'astsID' },
                                { data: data?.reb ?? [0], label: 'Reb', yAxisId: 'rebID' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: data.game_date, height: 28 }]}
                            yAxis={[
                                { id: 'ptsID', width: 50 },
                                { id: 'astsID', position: 'none' },
                                { id: 'rebID', position: 'right' },
                            ]}
                            slotProps={{
                                legend: {
                                    direction: "vertical",
                                    position: { vertical: 'middle', horizontal: 'end' },
                                },
                            }}
                        />
                    </Card>
                </div>
            </Card>

            <FiltersModal show={showFiltersModal} onHide={handleHideModal} />
        </Container>
    );
}