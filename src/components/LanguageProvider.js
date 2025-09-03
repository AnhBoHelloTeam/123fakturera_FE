import { useState } from 'react';

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

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

  return children({ language, setLanguage, headerLinks });
}

export default LanguageProvider;