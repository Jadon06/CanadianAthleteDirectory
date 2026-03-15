import { Button, InputGroup, Card} from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

interface credentials {
    username: string;
    password: string;
}

export default function VerifyCreateAndLogin() {
    const { token } = useParams();
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

    const login_user = async() => {
        const response = await fetch(`http://localhost:8001/login/${token}`,
            {method: 'POST',
            headers: {'Content-Type': "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                username: credentials["username"],
                password: credentials["password"]
                })
            })
        if (!response.ok) {
            const data = await response.json()
            setLoginError(data.detail)
            return;
        }
        const data = await response.json()
        console.log(data)
        return response.ok
    }

    const navigate = useNavigate()

    const handleClick = async () => {
        const result = await login_user()
        if (result) {
            navigate("/dashboard")
        }
    }

    return (
        <>
            <Card style={{border: "1px solid black"}}>
                <div className="center-container">
                    <img 
                        src='Logo.png'
                        height={"150px"}
                        width={"150px"}
                    />
                </div>

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
                <div className="center-container">
                    <Button variant='light' className='normal-button' onClick={handleClick} 
                    style={{marginTop: "30px", fontSize: "20px", width: "100px"}}>
                        login
                    </Button>
                </div>
            </Card>

            {loginError && (
                <Alert variant="danger" style={{ marginTop: "20px" , marginBottom: "0px"}}>
                    username or password incorrect
                </Alert>
            )}
        </>
    );
}