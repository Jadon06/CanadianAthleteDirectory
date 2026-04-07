import { Button, InputGroup, Card, Nav} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select'

interface Option {
  value: string;
  label: string;
};

interface userBuild {
    height: string;
    weight: string;
    age: string;
    school: Option;
    user_type: Option;
}

const schoolOptions = [
    {value: "Acadia University", label: "Acadia University"},
    {value: "Dalhousie University", label: "Dalhousie University"},
    {value: "Memorial University of Newfoundland", label: "Memorial University of Newfoundland"},
    {value: "Mount Allison University", label: "Mount Allison University"},
    {value: "Saint Mary's University", label: "Saint Mary's University"},
    {value: "St. Francis Xavier University", label: "St. Francis Xavier University"},
    {value: "St. Thomas University", label: "St. Thomas University"},
    {value: "Université de Moncton", label: "Université de Moncton"},
    {value: "University of New Brunswick (UNB)", label: "University of New Brunswick (UNB)"},
    {value: "University of Prince Edward Island (UPEI)", label: "University of Prince Edward Island (UPEI)"}
]

const userTypeOptions = [
    {value: "Athlete", label: "Athlete"},
    {value: "Scout", label: "Scout"},
    {value: "Coach", label: "Coach"},
    {value: "Other", label: "Other"}
]


export default function VerifyCreateAndLogin() {
    const { token } = useParams();
    // const [redirectStatus, setRedirectStatus] = useState(false)
    const [showWelcomePage, setShowWelcomePage] = useState(true)
    const [showUserDetailsPage, setShowUserDetailsPage] = useState(false)
    const [showExtraDetailsPage, setShowExtraDetailsPage] = useState(false)

    const [newBuild, setNewBuild] = useState<userBuild>({
        height: "",
        weight: "",
        age: "",
        school: {value: "", label: ""},
        user_type: {value: "", label: ""}
    })

    const handleChange = (key: keyof userBuild, value: string) => {
        setNewBuild(prev => ({
            ...prev,
            [key] : value
        }));
    };

    const create_user = async() => {
        const response = await fetch(`http://localhost:8001/login/${token}`,{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', // Required for JSON data
                },
                body: JSON.stringify(newBuild)
            })
        if (!response.ok) {
            return;
        }
        else {
            console.log(response.json())
        }
    }

    const navigate = useNavigate()

    const handleClickNext1 = () => {
        setShowWelcomePage(false)
        setShowUserDetailsPage(true)
    }

    const handleClickNext2 = () => {
        setShowUserDetailsPage(false)
        setShowExtraDetailsPage(true)
    }

    const handleClickFinish = async() => {
        await create_user()
        navigate("/login")
    }
    
    return (
        <>
            {showWelcomePage && 
                <div>
                    <div style={{border: "1px solid black", height: "800px", width: "800px"}}>
                        <h1>Welcome to Northern Athletics</h1>
                        <div>Your Account has been verified, please press next to complete your account setup</div>
                        <Button onClick={handleClickNext1} style={{bottom: "10px", right: "10px"}}>Next</Button>
                    </div>
                </div>
            }
            {showUserDetailsPage && 
                <div style={{border: "1px solid black", height: "800px", width: "800px"}}>
                    <InputGroup className="input-settings">
                        <InputGroup.Text id="height">Height</InputGroup.Text>
                        <Form.Control
                            placeholder={"Enter height in cm(height in ft/in x 30.48)"}
                            value={newBuild.height}
                            onChange={e => handleChange("height", e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="input-settings">
                        <InputGroup.Text id="weight">Weight</InputGroup.Text>
                        <Form.Control
                            placeholder={"Enter weight in lbs"}
                            value={newBuild.weight}
                            onChange={e => handleChange("weight", e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="input-settings">
                        <InputGroup.Text id="age">Age</InputGroup.Text>
                        <Form.Control
                            placeholder={"Enter age in yrs"}
                            value={newBuild.age}
                            onChange={e => handleChange("age", e.target.value)}
                        />
                    </InputGroup>
                    <Button onClick={handleClickNext2}>Next</Button>
                </div>
            }
            {showExtraDetailsPage && 
                <div style={{border: "1px solid black", height: "800px", width: "800px"}}>
                    <InputGroup className="input-settings">
                        <InputGroup.Text id="school">School</InputGroup.Text>
                        <div style={{flex: "1", }}>
                            <Select<Option>
                                className="basic-single"
                                classNamePrefix="select"
                                options={schoolOptions} 
                                placeholder={"School name"}
                                value={newBuild.school}
                                onChange={(option) =>
                                    handleChange("school", option?.value || "")}
                                />
                        </div>
                    </InputGroup>
                    <InputGroup className="input-settings">
                        <InputGroup.Text id="userType">Who are you?</InputGroup.Text>
                        <div style={{flex: "1", }}>
                            <Select<Option>
                                className="basic-single"
                                classNamePrefix="select"
                                options={userTypeOptions} 
                                placeholder={"Select"}
                                value={newBuild.user_type}
                                onChange={(option) =>
                                    handleChange("user_type", option?.value || "")}
                                />
                        </div>
                    </InputGroup>
                    <Button onClick={handleClickFinish}>Finish</Button>
                </div>
            }
        </>
    );
} 
