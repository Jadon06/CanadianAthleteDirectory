import { Modal, Button, Form, Container, Nav, NavDropdown, Card, ButtonGroup, Table, ButtonToolbar, ModalBody} from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useState } from 'react';

export interface ViewFiltersProp {
    show: boolean;
    onHide: () => void;
}

export default function FiltersModal({ show, onHide } : ViewFiltersProp) {
    const [showAsts, setShowAsts] = useState(true)
    const [showPts, setShowPts] = useState(true)
    const [showReb, setShowReb] = useState(true)
    const [showStls, setShowStls] = useState(false)
    const [showOReb, setShowOReb] = useState(false)
    const [showDReb, setShowDReb] = useState(false)
    const [showFg, setShowFg] = useState(false)
    const [show3Pt, setShow3Pt] = useState(false)
    const [showFt, setShowFt] = useState(false)
    
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <h1 style={{fontSize: "25px"}}>Edit Stat Selection</h1>
            </Modal.Header>
            <ModalBody>
                <FormGroup>
                    <Table>
                        <tbody>
                            <tr>
                                <td><FormControlLabel control={<Checkbox
                                                                defaultChecked
                                                                checked={showAsts}
                                                                onChange={(e) => setShowAsts(e.target.checked)}
                                                                />} 
                                                                label="Ast" />
                                </td>
                                <td><FormControlLabel control={<Checkbox
                                                                defaultChecked
                                                                checked={showPts}
                                                                onChange={(e) => setShowPts(e.target.checked)}
                                                                />} 
                                                                label="Pts" />
                                </td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox
                                                                defaultChecked 
                                                                checked={showReb}
                                                                onChange={(e) => setShowReb(e.target.checked)}
                                                                />} 
                                                                label="Reb" />
                                </td>
                                <td><FormControlLabel control={<Checkbox
                                                                checked={showStls}
                                                                onChange={(e) => setShowStls(e.target.checked)}
                                                                />} 
                                                                label="Stls" />
                                </td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox 
                                                                checked={showOReb}
                                                                onChange={(e) => setShowOReb(e.target.checked)}
                                                                />} 
                                                                label="OReb" />
                                </td>
                                <td><FormControlLabel control={<Checkbox 
                                                                checked={showDReb}
                                                                onChange={(e) => setShowDReb(e.target.checked)}
                                                                />} 
                                                                label="DReb" />
                                </td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox 
                                                                checked={showFg}
                                                                onChange={(e) => setShowFg(e.target.checked)}
                                                                />} 
                                                                label="Fg%" />
                                </td>
                                <td><FormControlLabel control={<Checkbox 
                                                                checked={show3Pt}
                                                                onChange={(e) => setShow3Pt(e.target.checked)}
                                                                />} 
                                                                label="3Pt%" /></td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox 
                                                                checked={showFt}
                                                                onChange={(e) => setShowFt(e.target.checked)}
                                                                />} 
                                                                label="Ft%" /></td>
                            </tr>
                        </tbody>
                    </Table>
                </FormGroup>
            </ModalBody>
        </Modal>
    );
}