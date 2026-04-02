import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
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

export interface statDataProp {
    data: StatData;
}

export default function AnalyticsHeader({ data } : statDataProp) {
    const [showFiltersModal, setShowFiltersModal] = useState(false)

    const handleHideModal = () => {
        setShowFiltersModal(false)
    }

    return (
        <div className="d-flex flex-row justify-content-start" style={{height: "400px", width: "100%", border: "1px solid black"}}>
            <BarChart
                width={400}
                height={300}
                series={[
                    { data: data?.pts ?? [0], label: 'Pts/G', id: 'PPGID' },
                    { data: data?.ast ?? [0], label: 'Asts/G', id: 'APGID' },
                    { data: data?.reb ?? [0], label: 'Reb/G', id: 'RPGID' },
                    { data: data?.stl ?? [0], label: 'Stl/G', id: 'STLSID' },
                ]}
                xAxis={[{ data: ['Stats', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], scaleType: 'band', height: 28 }]}
                yAxis={[{ width: 50 }]}
            />

            <LineChart
                series={[
                    { data: data?.pts ?? [0], label: 'pv', yAxisId: 'leftAxisId' },
                    { data: data?.ast ?? [0], label: 'uv', yAxisId: 'rightAxisId' },
                ]}
                xAxis={[{ scaleType: 'point', data: ['Stats', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], height: 28 }]}
                yAxis={[
                    { id: 'leftAxisId', width: 50 },
                    { id: 'rightAxisId', position: 'right' },
                ]} 
            />
            
            <CiSliderHorizontal 
                style={{cursor: "pointer", height: "20px", width: "20px", 
                    marginTop: "45px", right: "270px", zIndex: 10, position: "absolute"}}
                onClick={() => setShowFiltersModal(true)}
            />

            <FiltersModal show={showFiltersModal} onHide={handleHideModal} />
        </div>
    );
}