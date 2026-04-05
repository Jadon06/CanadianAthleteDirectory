import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import type { StatData, statDataProp } from './AnalyticsHeader';

import { useState } from 'react';
import type { OverallStatData, PreviousSeasonOverallStats } from './AnalyticsHeader';

export interface BodyProps {
    overallData: OverallStatData;
    previousData: PreviousSeasonOverallStats;
    gameData: StatData;
}

export default function AnalyticsBody({ overallData, previousData, gameData } : BodyProps) {
    return (
        <div className="d-flex flex-column" style={{border: "1px solid black", width: "100%", height: "500px", marginTop: "10px"}}>
            <div className='d-flex flex-row flex-start'>
                <div style={{marginTop: "20px", border: "1px solid black", marginRight: "10px"}}>
                    <BarChart
                        width={400}
                        height={300}
                        series={[
                            { data: [overallData?.Points, overallData?.Assists, overallData?.Blocks, overallData?.Games], label: '2025-2026', id: 'current_sznID' },
                            { data: [previousData?.Points, previousData?.Assists, previousData?.Blocks, previousData?.Games], label: '2024-2025', id: 'previous_sznID' },
                        ]}
                        xAxis={[{ data: ['Points', 'Assists', 'Blocks', 'Games'], scaleType: 'band', height: 28 }]}
                        yAxis={[{ width: 50 }]}
                    />
                </div>

                <Table style={{border: "1px solid black", marginTop: "10px"}}>
                    <thead>
                        <tr>
                            <th>Player Strengths</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}