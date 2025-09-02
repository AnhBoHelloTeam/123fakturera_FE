import { useState, useEffect } from 'react';
     import axios from 'axios';
     import HamburgerMenu from '../components/HamburgerMenu';
     import TermsContent from '../components/TermsContent';

     function Terms({ language, setLanguage }) {
       const [content, setContent] = useState('');
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);

       useEffect(() => {
         const fetchTerms = async () => {
           try {
             setLoading(true);
             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/terms?language=${language}`);
             setContent(response.data.content);
             setLoading(false);
           } catch (err) {
             setError('Failed to load terms.');
             setLoading(false);
           }
         };
         fetchTerms();
       }, [language]);

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
             {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <TermsContent content={content} />}
           </main>
         </div>
       );
     }

     export default Terms;