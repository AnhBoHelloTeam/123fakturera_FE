import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terms from './pages/Terms';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import LanguageProvider from './components/LanguageProvider';
import Verify from './components/Verify';
import MyBusiness from './components/MyBusiness';
import SelectLanguage from './pages/SelectLanguage';
import PriceList from './pages/Pricelist';
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
              <Route path="/verify" element={<Verify />} />
              <Route path="/select-language" element={<SelectLanguage setLanguage={setLanguage} />} />
              <Route path="/mybusiness" element={<MyBusiness language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/price-list" element={<PriceList language={language} setLanguage={setLanguage} />} /> {/* Add this new route */}

            </Routes>
          </div>
        )}
      </LanguageProvider>
    </Router>
  );
}

export default App;