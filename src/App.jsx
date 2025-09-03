import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terms from './pages/Terms';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import LanguageProvider from './components/LanguageProvider';
import './assets/styles.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        {({ language, setLanguage, headerLinks }) => (
          <div className="app">
            <Routes>
              <Route path="/" element={<Home language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/terms" element={<Terms language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/about" element={<About language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/contact" element={<Contact language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/login" element={<Login language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/register" element={<Register language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
            </Routes>
          </div>
        )}
      </LanguageProvider>
    </Router>
  );
}

export default App;