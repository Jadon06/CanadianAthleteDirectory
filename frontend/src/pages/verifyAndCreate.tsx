import { Button, InputGroup, Card, Nav} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

interface credentials {
    username: string;
    password: string;
}

export default function VerifyCreateAndLogin() {
    const { token } = useParams();
    const [redirectStatus, setRedirectStatus] = useState(false)
    

    const create_user = async() => {
        const response = await fetch(`http://localhost:8001/login/${token}`,
            {method: 'POST',
            headers: {'Content-Type': "application/x-www-form-urlencoded"}
            // credentials: "include",
            // body: new URLSearchParams({
            //     username: credentials["username"],
            //     password: credentials["password"]
            //     })
            })
        if (!response.ok) {
            // const data = await response.json()
            return;
        }
        const data = await response.json()
        console.log(data)
        setRedirectStatus(true)
        return response.ok
    }

    // const navigate = useNavigate()

    useEffect(() => {
        const create = async () => {
            await create_user()
        }
        create();
    }, []);

    if (redirectStatus) {
        return (
            <Navigate to="/login" replace={true}/>
        );
    } 
}