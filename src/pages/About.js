import { useState, useEffect } from 'react';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';

function About({ language, setLanguage }) {
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/about?language=${language}`);
        setTitle(response.data.title || 'About Us');
        setButton(response.data.button || 'Go to Contact');
        setContext(response.data.context || '<p>Learn more about 123 Fakturera and our mission.</p>');
        setLoading(false);
      } catch (err) {
        setError('Failed to load about.');
        setLoading(false);
      }
    };
    fetchAbout();
  }, [language]);

  const handleNavigate = () => {
    window.location.href = '/contact'; // Chuyển đến trang Contact
  };

  return (
    <div className="terms-container" style={{ backgroundImage: `url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)` }}>
      <header className="header">
        <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="logo" />
        <HamburgerMenu />
        <div className="language-switcher">
          <img
            src="https://storage.123fakturera.no/public/flags/GB.png"
            alt="English"
            className={language === 'en' ? 'flag active' : 'flag'}
            onClick={() => setLanguage('en')}
          />
          <img
            src="https://storage.123fakturera.no/public/flags/SE.png"
            alt="Swedish"
            className={language === 'sv' ? 'flag active' : 'flag'}
            onClick={() => setLanguage('sv')}
          />
        </div>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="terms-main">
            <div className="terms-title">{title}</div>
            <div className="terms-content" dangerouslySetInnerHTML={{ __html: context }} />
            <button className="terms-button" onClick={handleNavigate}>
              {button}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default About;