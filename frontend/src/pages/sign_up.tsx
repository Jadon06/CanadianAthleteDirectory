import React, { Fragment } from "react"
import { Navbar, Nav, Button, Carousel, Row, Col, ButtonGroup, Table } from 'react-bootstrap';

export default function Sign_up() {
    return (
        <Fragment>
            <Table >
                <thead style={{borderColor: 'white'}}>
                    <th className="vertical-table-container">First Name</th>
                    <th className="vertical-table-container">Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>

                </thead>
            </Table>
        </Fragment>
    );
}