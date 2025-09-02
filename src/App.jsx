import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Terms from './pages/Terms';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './assets/styles.css';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
          <Route path="/terms" element={<Terms language={language} setLanguage={setLanguage} />} />
          <Route path="/about" element={<About language={language} setLanguage={setLanguage} />} />
          <Route path="/contact" element={<Contact language={language} setLanguage={setLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;