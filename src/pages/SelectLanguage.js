import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../assets/selectLanguageStyles.css';
import '../assets/commonStyles.css'; // Import commonStyles.css để sử dụng .background-fixed

function SelectLanguage({ setLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const headerLinks = {
    en: [],
    sv: [],
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      const searchParams = new URLSearchParams(location.search);
      const sessionToken = searchParams.get('token');
      if (sessionToken) {
        localStorage.setItem('token', sessionToken);
      } else {
        navigate('/login');
      }
    }
  }, [navigate, location]);

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setError(null);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      navigate('/mybusiness');
    } else {
      setError('Please select a language.');
    }
  };

  return (
    <Layout language={selectedLanguage || 'en'} setLanguage={setLanguage} headerLinks={headerLinks}>
      <div className="background-fixed"></div> {/* Thêm nền từ commonStyles.css */}
      <div className="select-language-content-root">
        <div className="back-select-language">
          <h2 className="select-language-heading">Choose Language</h2>
          <p className="language-description">
            Here you can choose which language you want to use on the invoices and in the user interface.
          </p>
          <div className="language-options">
            <button
              className={`language-button ${selectedLanguage === 'sv' ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect('sv')}
            >
              <img src="https://storage.123fakturera.se/public/flags/SE.png" alt="Swedish" className="flag" loading="lazy" />
              Svenska
            </button>
            <button
              className={`language-button ${selectedLanguage === 'en' ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect('en')}
            >
              <img src="https://storage.123fakturera.se/public/flags/GB.png" alt="English" className="flag" loading="lazy" />
              English
            </button>
          </div>
          <p className="footer-description">
            You can change this at any time in My Business settings. There you can also use different language for the invoice and the user interface.
          </p>
          {error && <span className="error-span">{error}</span>}
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default SelectLanguage;