import { useState } from 'react';
     import Terms from './pages/Terms';
     import './assets/styles.css';

     function App() {
       const [language, setLanguage] = useState('en');

       return (
         <div className="app">
           <Terms language={language} setLanguage={setLanguage} />
         </div>
       );
     }

     export default App;