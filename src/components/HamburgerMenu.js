import { useState } from 'react';

function HamburgerMenu({ language }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          {headerLinks[language].map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HamburgerMenu;