import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import TermsContent from '../components/TermsContent';
import '../assets/termsStyles.css';

function Terms({ language, setLanguage }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Không thể tải điều khoản.');
        setLoading(false);
      }
    };
    fetchTerms();
  }, [language]);

  const handleClose = () => {
    window.history.back();
  };

  // Terms page hiển thị trên tất cả màn hình

  return (
    <div className="terms-page">
      <div className="terms-background" style={{
        backgroundImage: 'url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}></div>
      
      <Layout language={language} setLanguage={setLanguage} headerLinks={headerLinks}>
        <div className="container">
          {loading ? (
            <p>Đang tải...</p>
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
        </div>
      </Layout>
    </div>
  );
}

export default Terms;