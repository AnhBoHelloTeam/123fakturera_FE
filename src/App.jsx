import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terms from './pages/Terms';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import LanguageProvider from './components/LanguageProvider';
import Verify from './components/Verify';
import VerifyEmail from './pages/VerifyEmail';
import MyBusiness from './components/MyBusiness';
import SelectLanguage from './pages/SelectLanguage';
import PriceList from './pages/Pricelist';
import Invoices from './pages/Invoices';
import Customers from './pages/Customers';
import OurCustomers from './pages/OurCustomers';
import OtherPrograms from './pages/OtherPrograms';
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
              <Route path="/verify-email" element={<VerifyEmail language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/select-language" element={<SelectLanguage setLanguage={setLanguage} />} />
              <Route path="/mybusiness" element={<MyBusiness language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/price-list" element={<PriceList language={language} setLanguage={setLanguage} />} />
              <Route path="/invoices" element={<Invoices language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/customers" element={<Customers language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/our-customers" element={<OurCustomers language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />
              <Route path="/other-programs" element={<OtherPrograms language={language} setLanguage={setLanguage} headerLinks={headerLinks} />} />

            </Routes>
          </div>
        )}
      </LanguageProvider>
    </Router>
  );
}

export default App;