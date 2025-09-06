import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify?token=${token}`);
        localStorage.setItem('token', response.data.token);
        navigate(response.data.redirect || '/select-language');
      } catch (err) {
        console.error('Verification error:', err.response?.data || err.message);
        navigate('/login'); // Redirect to login on error
      }
    };

    verifyEmail();
  }, [location, navigate]);

  // Không render giao diện
  return null;
}

export default Verify;