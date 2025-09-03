import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/myBusinessStyles.css';

function MyBusiness({ language, setLanguage, headerLinks }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get('http://localhost:3001/api/mybusiness', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load user data.');
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate]);

    const titles = {
        sv: 'Mitt Företag',
        en: 'My Business',
    };

    return (
        <div className="mybusiness-container">
            <header className="header">
                <div className="header-left">
                    <img
                        src="https://storage.123fakturera.se/public/icons/diamond.png"
                        alt="Logo"
                        className="logo"
                        onClick={() => navigate('/login')}
                        style={{ cursor: 'pointer' }}
                    />
                    <HamburgerMenu language={language} headerLinks={headerLinks} />
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
                <div className="mybusiness-content-root">
                    <div className="back-mybusiness">
                        <h2 className="mybusiness-heading">{titles[language]}</h2>
                        {error && <span className="error-span">{error}</span>}
                        {userData && (
                            <div className="mybusiness-info">
                                <p><strong>{language === 'sv' ? 'Företagets namn' : 'Company Name'}:</strong> {userData.companyName}</p>
                                <p><strong>{language === 'sv' ? 'Kontaktperson' : 'Contact Person'}:</strong> {userData.contactPerson}</p>
                                <p><strong>{language === 'sv' ? 'Adress' : 'Address'}:</strong> {userData.address}</p>
                                <p><strong>{language === 'sv' ? 'Postnummer' : 'Post Number'}:</strong> {userData.postNumber}</p>
                                <p><strong>{language === 'sv' ? 'Ort' : 'City'}:</strong> {userData.city}</p>
                                <p><strong>{language === 'sv' ? 'Mobil' : 'Mobile'}:</strong> {userData.mobile}</p>
                                <p><strong>{language === 'sv' ? 'E-post' : 'Email'}:</strong> {userData.email}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyBusiness;