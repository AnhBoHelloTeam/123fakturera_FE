import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            const token = new URLSearchParams(location.search).get('token');
            if (!token) {
                setError('No verification token provided.');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3001/api/verify?token=${token}`);
                localStorage.setItem('token', response.data.token);
                navigate(response.data.redirect);
            } catch (err) {
                setError(err.response?.data?.error || 'Verification failed.');
            }
        };
        verifyEmail();
    }, [location, navigate]);

    return (
        <div>
            {error ? (
                <h2>{error}</h2>
            ) : (
                <h2>Verifying your email...</h2>
            )}
        </div>
    );
}

export default Verify;