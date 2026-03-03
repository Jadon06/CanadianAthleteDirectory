import { Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

interface new_user {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    confirm_password: string;
}

export default function Sign_up() {
    const [newUser, setNewUser] = useState<new_user>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: ""
    });
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setphoneNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [userExistsError, setUserExistsError] = useState(false)

    const handleChange = (key: keyof new_user, value: string) => {
        setNewUser(prev => ({
            ...prev,
            [key] : value
        }));
    };
    
    const CreateUser =  async () => {
        const response = await fetch('http://localhost:8001/users/', 
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)  
        })
        if (!response.ok) {
            const data = await response.json()
            setUserExistsError(data.detail)
            return;
        }
    }

    const navigate = useNavigate()

    const handleClick = async () => {
        let haserror = false;

        if (!newUser.first_name.trim()) {
            setFirstNameError("First name is empty");
            haserror=true;
        }
        if (!newUser.last_name.trim()) {
            setLastNameError("Last name is empty");
            haserror=true;
        }
        if (!newUser.email.trim()) {
            setEmailError("Email is empty");
            haserror=true;
        }
        if (!newUser.phone_number.trim()) {
            setphoneNumberError("Phone number is empty");
            haserror=true;
        }
        if (!newUser.password.trim()) {
            setPasswordError("Password is empty");
            haserror=true;
        }
        if (newUser.password !== newUser.confirm_password) {
            setPasswordAlert(true);
            return;
        }
        // if (newUser.password == newUser.confirm_password) {
        //     setPasswordAlert(false);
        //     return;
        // }
        
        if (haserror) return;
        navigate("/verify")
        CreateUser();
    };

    return (
        <>
            <h1 style={{marginBottom: "100px"}}>Sign Up Now</h1>

            <InputGroup className="input-settings">
                    <InputGroup.Text id="first_name">First Name</InputGroup.Text>
                    <Form.Control
                        placeholder={firstNameError || "Enter Here"}
                        value={newUser.first_name}
                        onChange={e => handleChange("first_name", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="input-settings">
                    <InputGroup.Text id="last_name">Last Name</InputGroup.Text>
                    <Form.Control
                        placeholder={lastNameError || "Enter Here"}
                        value={newUser.last_name}
                        onChange={e => handleChange("last_name", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="input-settings">
                    <InputGroup.Text id="email">Email</InputGroup.Text>
                    <Form.Control
                        placeholder={emailError || "Enter Here"}
                        value={newUser.email}
                        onChange={e => handleChange("email", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="input-settings">
                    <InputGroup.Text id="phone_number">Phone Number</InputGroup.Text>
                    <Form.Control
                        placeholder={phoneNumberError || "Enter Here"}
                        value={newUser.phone_number}
                        onChange={e => handleChange("phone_number", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="input-settings">
                    <InputGroup.Text id="password">Password</InputGroup.Text>
                    <Form.Control
                        type={"password"}
                        placeholder={passwordError || "Enter Here"}
                        value={newUser.password}
                        onChange={e => handleChange("password", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="input-settings">
                    <InputGroup.Text id="confirm_password">Confirm Password</InputGroup.Text>
                    <Form.Control
                        type={"password"}
                        placeholder={"Enter Here"}
                        value={newUser.confirm_password}
                        onChange={e => handleChange("confirm_password", e.target.value)}
                    />
                </InputGroup>

            {passwordAlert && (
                <Alert variant="danger" style={{ marginTop: "20px" , marginBottom: "0px"}}>
                    Password mismatch!
                </Alert>
            )}
            {userExistsError && (
                <Alert variant="danger" style={{ marginTop: "20px" , marginBottom: "0px"}}>
                    {userExistsError}
                </Alert>
            )}

            <Button variant='light' className='normal-button' onClick={handleClick} style={{marginTop: "50px", fontSize: "20px"}}
            >Finish</Button>
        </>
    );
}