import { Button, Card, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { navigateToOwnDashboard } from '../utils/dashboardRoute';

interface credentials {
    username: string;
    password: string;
}

export default function Login() {
    const [credentials, setCredentials] = useState<credentials>({
        username: "",
        password: ""
    });
    const [loginError, setLoginError] = useState(false)
    const handleChange = (key: keyof credentials, value: string) => {
        setCredentials(prev => ({
            ...prev,
            [key] : value
        }));
    };

    const navigate = useNavigate()

    const login_user = async() => {
        const response = await fetch('http://localhost:8001/login/',
            {method: 'POST',
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            credentials: "include",
            body: new URLSearchParams({
                username: credentials["username"],
                password: credentials["password"]
                })
            })
        if (!response.ok) {
            const data = await response.json()
            setLoginError(data.detail)
            console.log("failed to send")
            return;
        }
        const data = await response.json()
        await navigateToOwnDashboard(navigate)
        return console.log(data)
    }

    const handleClick = async () => {
        console.log(login_user())
    }

    return (
        <div className="auth-shell">
            <div className="auth-hero">
                <img src="Logo.png" alt="Northern Athletics" className="auth-logo" />
                <div className="eyebrow">Athlete network</div>
                <h1 className="auth-title">Sign in to your athlete workspace</h1>
                <p className="auth-copy">Pick up where you left off: messages, profile updates, highlights, and search.</p>
            </div>

            <Card className="surface-card" style={{ padding: "18px", borderRadius: "24px" }}>
                <InputGroup className="input-settings">
                        <InputGroup.Text id="email">Email</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter Here'
                            value={credentials.username}
                            onChange={e => handleChange("username", e.target.value)}
                        />
                    </InputGroup>

                <InputGroup className="input-settings">
                        <InputGroup.Text id="password">Password</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter Here'
                            type="password"
                            value={credentials.password}
                            onChange={e => handleChange("password", e.target.value)}
                        />
                    </InputGroup>
                <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <Button variant='light' className='normal-button' onClick={handleClick} style={{ fontSize: "1rem", minWidth: "160px" }}>
                        Login
                    </Button>
                    <div className="muted-copy">
                        New here? <Link to="/sign-up">Create an account</Link>
                    </div>
                </div>
            </Card>

            {loginError && (
                <Alert variant="danger" style={{ marginTop: "20px" , marginBottom: "0px"}}>
                    username or password incorrect
                </Alert>
            )}
        </div>
    );
}