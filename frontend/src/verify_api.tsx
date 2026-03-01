import { useState, useEffect } from 'react';

interface new_user {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
}

const CreateNewUser = () => {
    const [new_users, set_new_user] = useState<new_user[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    
    const fetchNewUser = async () => {
        try {
            const response = await fetch("http://api:8001/users/", {method: "POST"})
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: new_user[] = await response.json();
            set_new_user(data);
        } catch(error: any) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {fetchNewUser();}, []);
}



export default CreateNewUser