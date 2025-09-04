import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import '../assets/commonStyles.css';

function Layout({ language, setLanguage, headerLinks, children }) {
  const navigate = useNavigate();

  return (
    <div className="container">
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
      <main>{children}</main>
    </div>
  );
}

export default Layout;