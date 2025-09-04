// pages/SelectLanguage.js
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/selectLanguageStyles.css';

function SelectLanguage({ setLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

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
    setError(null); // Xóa thông báo lỗi khi người dùng chọn ngôn ngữ
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
    <div className="select-language-container">
      <header className="header">
        <div className="header-left">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="logo"
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          />
          <HamburgerMenu language="en" headerLinks={{ en: [], sv: [] }} />
        </div>
        <div className="header-right">
          <div className="language-switcher">
            <img
              src="https://storage.123fakturere.no/public/flags/GB.png"
              alt="English"
              className="flag active"
              onClick={() => handleLanguageSelect('en')}
            />
            <img
              src="https://storage.123fakturere.no/public/flags/SE.png"
              alt="Swedish"
              className="flag"
              onClick={() => handleLanguageSelect('sv')}
            />
          </div>
        </div>
      </header>
      <main>
        <div className="select-language-content-root">
          <div className="back-select-language">
            <h2 className="select-language-heading">Choose Language</h2>
            <p className="language-description">
              Here you can choose which language you want to use on the invoices and in the user interface.
            </p>
            <div className="language-options">
              {/* Nút Svenska */}
              <button
                className={`language-button ${selectedLanguage === 'sv' ? 'selected' : ''}`}
                onClick={() => handleLanguageSelect('sv')}
              >
                <img src="https://storage.123fakturera.se/public/flags/SE.png" alt="Swedish" className="flag" />
                Svenska
              </button>
              {/* Nút English */}
              <button
                className={`language-button ${selectedLanguage === 'en' ? 'selected' : ''}`}
                onClick={() => handleLanguageSelect('en')}
              >
                <img src="https://storage.123fakturera.se/public/flags/GB.png" alt="English" className="flag" />
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
      </main>
    </div>
  );
}

export default SelectLanguage;