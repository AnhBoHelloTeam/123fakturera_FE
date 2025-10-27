import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../assets/registerStyles.css';

function Register({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [address, setAddress] = useState('');
  const [postNumber, setPostNumber] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formTitles = {
    sv: 'Registrera dig',
    en: 'Register',
  };

  const formLabels = {
    sv: {
      email: 'E-postadress',
      password: 'Lösenord',
      companyName: 'Företagets namn',
      contactPerson: 'Kontaktperson',
      address: 'Adress',
      postNumber: 'Postnummer',
      city: 'Ort',
      mobile: 'Mobil',
    },
    en: {
      email: 'Email address',
      password: 'Password',
      companyName: 'Company name',
      contactPerson: 'Contact person',
      address: 'Address',
      postNumber: 'Post number',
      city: 'City',
      mobile: 'Mobile',
    },
  };

  const buttons = {
    sv: { register: 'Fakturera nu' },
    en: { register: 'Invoice now' },
  };

  const registerInfo = {
    sv: (
      <>
        <p>Du kan använda och prova 123 Fakturera helt gratis i 14 dagar.</p>
        <p>Detta är en äkta fullversion, så att du kan skicka 1000 fakturor eller mer, helt gratis.</p>
        <p>123 Fakturera är så lätt och självförklarande att chansen för att du kommer att behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge besked inom 14 dagar från i dag.</p>
        <p>Klicka Fakturera Nu för att fakturera och för att godkänna villkoren, và din första faktura är normalt klar till att skickas inom 5-10 minuter.</p>
      </>
    ),
    en: (
      <>
        <p>You can use and try 123 Fakturera for free for 14 days.</p>
        <p>This is a true full-version, so you can send out 1000 invoices or more, for free.</p>
        <p>123 Fakturera is so easy and self-explanatory that the chance that you will need help is minimal, but if you should need support, we are here for you, with our office manned for most part of the day. After the trial period, the subscription continues and costs 99 SEK excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from today.</p>
        <p>Click Invoice Now to start invoicing and to accept the terms, and your first invoice is normally ready to be sent in 5-10 minutes.</p>
      </>
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        companyName,
        contactPerson,
        address,
        postNumber,
        city,
        mobile,
        email,
        password,
      });
      setError(null);
      
      // Redirect to email verification page
      navigate('/verify-email', { 
        state: { 
          email: email,
          message: 'Registration successful! Please check your email to verify your account.' 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout language={language} setLanguage={setLanguage} headerLinks={headerLinks}>
      <div className="background-fixed" />
      <div className="container">
        <div className="register-content-root">
          <div className="back-register">
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <h2 className="register-heading">{formTitles[language]}</h2>
              <section className="register-section">
                <div className="register-input-field">
                  <label htmlFor="companyName" className="register-label">
                    {formLabels[language].companyName}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="companyName"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={formLabels[language].companyName}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="contactPerson" className="register-label">
                    {formLabels[language].contactPerson}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="contactPerson"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder={formLabels[language].contactPerson}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="address" className="register-label">
                    {formLabels[language].address}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={formLabels[language].address}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="postNumber" className="register-label">
                    {formLabels[language].postNumber}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="postNumber"
                    required
                    value={postNumber}
                    onChange={(e) => setPostNumber(e.target.value)}
                    placeholder={formLabels[language].postNumber}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="city" className="register-label">
                    {formLabels[language].city}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={formLabels[language].city}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="mobile" className="register-label">
                    {formLabels[language].mobile}
                  </label>
                  <input
                    className="register-input"
                    type="text"
                    id="mobile"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={formLabels[language].mobile}
                  />
                </div>
                <div className="register-input-field">
                  <label htmlFor="email" className="register-label">
                    {formLabels[language].email}
                  </label>
                  <input
                    className="register-input"
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={formLabels[language].email}
                    autoComplete="on"
                  />
                </div>
                <span className="error-span">{error}</span>
                <div className="register-input-field">
                  <label htmlFor="password" className="register-label">
                    {formLabels[language].password}
                  </label>
                  <div className="password-input-div">
                    <input
                      className="register-input"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={formLabels[language].password}
                    />
                    <img
                      id="show-password-img"
                      src="https://storage.123fakturera.se/public/icons/show_password.png"
                      alt="Show password"
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <span className="error-span"></span>
                <div className="register-info">{registerInfo[language]}</div>
              </section>
              <div className="Register-Button-div">
                <button type="submit" className="Register-Button">
                  {buttons[language].register}
                </button>
              </div>
              <section className="gotodifferntlink">
                <a
                  href="/login"
                  className="register-login-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  {language === 'sv' ? 'Har du redan ett konto? Logga in' : 'Already have an account? Log in'}
                </a>
              </section>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;