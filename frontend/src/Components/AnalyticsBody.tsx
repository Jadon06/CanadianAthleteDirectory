import { Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar} from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import type { StatData, statDataProp } from './AnalyticsHeader';

import { useState } from 'react';

export default function AnalyticsBody({ data } : statDataProp) {
    return (
        <div className="d-flex flex-column" style={{border: "1px solid black", width: "100%", height: "500px", marginTop: "10px"}}>
            {/* <BarChart
                dataset={data}
                xAxis={[{ scaleType: 'band', dataKey: 'group' }]}
                yAxis={[{ 
                    max: 100, // Ensure the axis goes to 100%
                    valueFormatter: (v) => `${v}%` // Format Y-axis ticks
                }]}
                series={[{ 
                    dataKey: 'value', 
                    label: 'Percentage',
                    valueFormatter: (v) => `${v}%` // Format tooltip/bar values
                }]}
                height={300}
            /> */}
        </div>
    );
}