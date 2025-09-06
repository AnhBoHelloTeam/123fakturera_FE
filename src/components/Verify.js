import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../assets/registerStyles.css'; // Tái sử dụng style từ register để đồng bộ giao diện

function Verify({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const messages = {
    sv: {
      verifying: 'Verifierar ditt konto...',
      success: 'Kontot verifierades framgångsrikt! Omdirigerar till språkval...',
      error: 'Fel vid verifiering: ',
      noToken: 'Ingen verifieringstoken tillhandahölls.',
    },
    en: {
      verifying: 'Verifying your account...',
      success: 'Account verified successfully! Redirecting to language selection...',
      error: 'Verification failed: ',
      noToken: 'No verification token provided.',
    },
  };

  const t = messages[language] || messages.en;

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (!token) {
        setError(t.noToken);
        setIsLoading(false);
        return;
      }

      try {
        setMessage(t.verifying);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify?token=${token}`);
        localStorage.setItem('token', response.data.token);
        setMessage(t.success);
        setTimeout(() => {
          navigate(response.data.redirect || '/select-language');
        }, 2000);
      } catch (err) {
        setError(t.error + (err.response?.data?.error || 'Vui lòng thử lại.'));
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [location, navigate, t]);

  return (
    <Layout language={language} setLanguage={setLanguage} headerLinks={headerLinks}>
      <div className="background-fixed" />
      <div className="container">
        <div className="register-content-root">
          <div className="back-register">
            <h2 className="register-heading">
              {language === 'sv' ? 'Verifiera Konto' : 'Verify Account'}
            </h2>
            <section className="register-section">
              {isLoading && !error ? (
                <p>{message}</p>
              ) : error ? (
                <span className="error-span">{error}</span>
              ) : (
                <p>{message}</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Verify;