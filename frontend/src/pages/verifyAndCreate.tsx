import { Button, Card, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { apiUrl } from '../utils/api';

interface Option {
  value: string;
  label: string;
};

interface userBuild {
    height: string;
    weight: string;
    age: string;
    school: string;
    user_type: string;
    profile_picture: string;
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
    const [showProfilePhotoPage, setShowProfilePhotoPage] = useState(false)
    const [profileImagePreview, setProfileImagePreview] = useState("")

    const [newBuild, setNewBuild] = useState<userBuild>({
        height: "",
        weight: "",
        age: "",
        school: "",
        user_type: "",
        profile_picture: ""
    })

    const handleChange = (key: keyof userBuild, value: string) => {
        setNewBuild(prev => ({
            ...prev,
            [key] : value
        }));
    };

    const create_user = async() => {
        const response = await fetch(apiUrl(`/login/${token}`),{
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

    const isStepOneComplete =
        newBuild.height.trim() !== "" &&
        newBuild.weight.trim() !== "" &&
        newBuild.age.trim() !== ""

    const isStepTwoComplete =
        newBuild.school.trim() !== "" &&
        newBuild.user_type.trim() !== ""

    const isStepThreeComplete = newBuild.profile_picture.trim() !== ""

    const handleClickNext1 = () => {
        setShowWelcomePage(false)
        setShowUserDetailsPage(true)
    }

    const handleClickNext2 = () => {
        if (!isStepOneComplete) {
            return
        }
        setShowUserDetailsPage(false)
        setShowExtraDetailsPage(true)
    }

    const handleClickNext3 = () => {
        if (!isStepTwoComplete) {
            return
        }
        setShowExtraDetailsPage(false)
        setShowProfilePhotoPage(true)
    }

    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) {
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setProfileImagePreview(reader.result)
                setNewBuild((prev) => ({
                    ...prev,
                    profile_picture: reader.result as string
                }))
            }
        }
        reader.readAsDataURL(file)
    }

    const handleClickFinish = async() => {
        if (!isStepOneComplete || !isStepTwoComplete || !isStepThreeComplete) {
            return
        }
        await create_user()
        navigate("/login")
    }
    
    return (
        <div className="verify-layout">
            {showWelcomePage && 
                <Card className="verify-step-card">
                    <div className="verify-hero">
                        <div className="eyebrow">Account verified</div>
                        <h1 className="section-title">Welcome to Northern Athletics</h1>
                        <p className="section-subtitle">Your account is active. Continue through setup so your profile looks complete from day one.</p>
                    </div>
                    <div className="verify-stage">
                        <span className="verify-step-pill">Verified</span>
                        <span className="verify-step-pill">Profile details</span>
                        <span className="verify-step-pill">School and role</span>
                        <span className="verify-step-pill">Profile photo</span>
                    </div>
                    <div className="modal-action-row">
                        <Button className="action-button btn" onClick={handleClickNext1}>Next</Button>
                    </div>
                </Card>
            }
            {showUserDetailsPage && 
                <Card className="verify-step-card">
                    <div className="verify-hero">
                        <div className="eyebrow">Step 1 of 3</div>
                        <h1 className="section-title">Add your core profile details.</h1>
                    </div>
                    <InputGroup className="input-settings modal-input">
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
                    <div className="modal-action-row">
                        <Button className="action-button btn" onClick={handleClickNext2} disabled={!isStepOneComplete}>Next</Button>
                    </div>
                </Card>
            }
            {showExtraDetailsPage && 
                <Card className="verify-step-card">
                    <div className="verify-hero">
                        <div className="eyebrow">Step 2 of 3</div>
                        <h1 className="section-title">Tell us where you play.</h1>
                    </div>
                    <InputGroup className="input-settings modal-input">
                        <InputGroup.Text id="school">School</InputGroup.Text>
                        <div style={{ flex: "1" }}>
                            <Select<Option, false>
                                classNamePrefix="modal-select"
                                options={schoolOptions}
                                placeholder={"School name"}
                                value={schoolOptions.find(option => option.value === newBuild.school) ?? null}
                                onChange={(option) => setNewBuild(prev => ({ ...prev, school: option?.value || "" }))}
                            />
                        </div>
                    </InputGroup>
                    <InputGroup className="input-settings modal-input">
                        <InputGroup.Text id="userType">Who are you?</InputGroup.Text>
                        <div style={{ flex: "1" }}>
                            <Select<Option, false>
                                classNamePrefix="modal-select"
                                options={userTypeOptions}
                                placeholder={"Select"}
                                value={userTypeOptions.find(option => option.value === newBuild.user_type) ?? null}
                                onChange={(option) => setNewBuild(prev => ({ ...prev, user_type: option?.value || "" }))}
                            />
                        </div>
                    </InputGroup>
                    <div className="modal-action-row">
                        <Button className="action-button btn" onClick={handleClickNext3} disabled={!isStepTwoComplete}>Next</Button>
                    </div>
                </Card>
            }
            {showProfilePhotoPage &&
                <Card className="verify-step-card">
                    <div className="verify-hero">
                        <div className="eyebrow">Step 3 of 3</div>
                        <h1 className="section-title">Upload or take a profile picture.</h1>
                        <p className="section-subtitle">This is required to complete your account setup.</p>
                    </div>

                    <InputGroup className="input-settings modal-input">
                        <InputGroup.Text id="profilePhoto">Profile picture</InputGroup.Text>
                        <div style={{ flex: "1" }}>
                            <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                capture="user"
                                onChange={handleProfileImageChange}
                            />
                        </div>
                    </InputGroup>

                    {profileImagePreview && (
                        <div style={{ marginTop: "12px" }}>
                            <div className="network-meta" style={{ marginBottom: "8px" }}>Preview</div>
                            <div style={{ width: "130px", height: "130px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(17, 34, 56, 0.12)" }}>
                                <img src={profileImagePreview} alt="Profile preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        </div>
                    )}

                    <div className="modal-action-row">
                        <Button className="action-button btn" onClick={handleClickFinish} disabled={!isStepThreeComplete}>Finish</Button>
                    </div>
                </Card>
            }
        </div>
    );
} 
