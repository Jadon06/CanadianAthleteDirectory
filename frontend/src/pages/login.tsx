import { Button, InputGroup, Card} from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

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

    const login_user = async() => {
        const response = await fetch('http://localhost:8001/login/${token}',
            {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)  
            })
        if (!response.ok) {
            const data = await response.json()
            setLoginError(data.detail)
            return;
        }
        const data = await response.json()
        return console.log(data)
    }

    const navigate = useNavigate()

    const handleClick = async () => {
        console.log(login_user())
    }

    return (
        <>
            <Card style={{border: "1px solid black"}}>
                <h1 style={{marginBottom: "30px"}}>Login</h1>

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

                <Button variant='light' className='normal-button' onClick={handleClick} style={{marginTop: "30px", fontSize: "20px"}}
                >login</Button>
            </Card>

            {loginError && (
                <Alert variant="danger" style={{ marginTop: "20px" , marginBottom: "0px"}}>
                    username or password incorrect
                </Alert>
            )}
        </>
    );
}