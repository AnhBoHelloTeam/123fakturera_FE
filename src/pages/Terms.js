import { useState, useEffect } from 'react';
import axios from 'axios';
import TermsContent from '../components/TermsContent';
import HamburgerMenu from '../components/HamburgerMenu';

function Terms({ language, setLanguage }) {
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Đối tượng chứa văn bản cho header
  const headerLinks = {
    sv: [
      { text: 'Hem', href: '/' },
      { text: 'Beställ', href: '/Order' },
      { text: 'Våra Kunder', href: '/Our-Customers' },
      { text: 'Om oss', href: '/About-us' },
      { text: 'Kontakta oss', href: '/Contact-Us' },
    ],
    en: [
      { text: 'Home', href: '/' },
      { text: 'Order', href: '/Order' },
      { text: 'Our Customers', href: '/Our-Customers' },
      { text: 'About us', href: '/About-us' },
      { text: 'Contact Us', href: '/Contact-Us' },
    ],
  };

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/terms?language=${language}`);
        if (response.data && response.data.title && response.data.button && response.data.context) {
          setTitle(response.data.title);
          setButton(response.data.button);
          setContext(response.data.context);
        } else {
          throw new Error('Invalid response data');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError('Failed to load terms.');
        setLoading(false);
      }
    };
    fetchTerms();
  }, [language]);

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="terms-container" style={{ backgroundImage: `url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)` }}>
      <header className="header">
        <div className="header-left">
          <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="logo" />
          <HamburgerMenu language={language} />
        </div>
        <div className="header-right">
          <nav className="nav-links">
            <ul>
              {headerLinks[language].map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="language-switcher">
            <img
              src="https://storage.123fakturere.no/public/flags/GB.png"
              alt="English"
              className={language === 'en' ? 'flag active' : 'flag'}
              onClick={() => setLanguage('en')}
            />
            <img
              src="https://storage.123fakturere.no/public/flags/SE.png"
              alt="Swedish"
              className={language === 'sv' ? 'flag active' : 'flag'}
              onClick={() => setLanguage('sv')}
            />
          </div>
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
            <button className="terms-button" onClick={handleClose}>
              {button}
            </button>
            <TermsContent content={context} />
            <button className="terms-button" onClick={handleClose}>
              {button}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Terms;