import { Card, Container, Table } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import type { OverallStatData } from './AnalyticsHeader';

export interface BodyProps {
    overallData: OverallStatData;
}

export default function AnalyticsBody({ overallData } : BodyProps) {
    return (
        <Container className="page-section" style={{ marginTop: "18px", marginBottom: "40px" }}>
            <div className="analytics-layout analytics-grid">
                <Card className="analytics-chart-card">
                    <div className="eyebrow" style={{ marginBottom: "12px" }}>Season snapshot</div>
                    <BarChart
                        width={420}
                        height={320}
                        series={[
                            { data: [overallData?.Points, overallData?.Assists, overallData?.Blocks, overallData?.Games], label: 'Current season', id: 'current_sznID' },
                        ]}
                        xAxis={[{ data: ['Points', 'Assists', 'Blocks', 'Games'], scaleType: 'band', height: 28 }]}
                        yAxis={[{ width: 50 }]}
                    />
                </Card>

                <Card className="analytics-summary-card">
                    <div className="eyebrow" style={{ marginBottom: "12px" }}>Player strengths</div>
                    <div className="stats-chip-row">
                        <span className="analytics-stat-chip">Points {overallData?.Points}</span>
                        <span className="analytics-stat-chip">Assists {overallData?.Assists}</span>
                        <span className="analytics-stat-chip">Blocks {overallData?.Blocks}</span>
                        <span className="analytics-stat-chip">Games {overallData?.Games}</span>
                        <span className="analytics-stat-chip">PPG {overallData?.Points_per_game}</span>
                        <span className="analytics-stat-chip">RPG {overallData?.Rebounds_per_game}</span>
                    </div>

                    <Table className="mt-3 mb-0" borderless responsive>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>FG%</td><td>{overallData?.FG_Pct}%</td></tr>
                            <tr><td>3PT%</td><td>{overallData?.threePT_Pct}%</td></tr>
                            <tr><td>FT%</td><td>{overallData?.FT_Pct}%</td></tr>
                            <tr><td>Minutes / game</td><td>{overallData?.Minutes_per_game}</td></tr>
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Container>
    );
}