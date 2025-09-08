import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../assets/loginStyles.css';

function Login({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formTitles = {
    sv: 'Logga in',
    en: 'Log in',
  };

  const formLabels = {
    sv: { email: 'E-postadress', password: 'Lösenord' },
    en: { email: 'Email address', password: 'Password' },
  };

  const buttons = {
    sv: { login: 'Logga in' },
    en: { login: 'Log in' },
  };

  const formLinks = {
    sv: { register: 'Registrera dig', forgot: 'Glömt lösenord?' },
    en: { register: 'Register', forgot: 'Forgot password?' },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate(response.data.redirect);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout language={language} setLanguage={setLanguage} headerLinks={headerLinks}>
      <div className="background-fixed" />
      <div className="container">
        <div className="login-content-root">
          <div className="back-login">
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <h2 className="login-heading">{formTitles[language]}</h2>
              <section className="login-section">
                <div className="login-email">
                  <div>
                    <label htmlFor="email" className="login-email-label">
                      {formLabels[language].email}
                    </label>
                  </div>
                  <input
                    className="login-input"
                    type="email"
                    id="email"
                    required
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={formLabels[language].email}
                    autoComplete="on"
                  />
                </div>
                <span className="email-error-span error-span">{error}</span>
                <div className="login-password">
                  <div>
                    <label htmlFor="password" className="login-password-label">
                      {formLabels[language].password}
                    </label>
                  </div>
                  <div className="password-input-div">
                    <input
                      className="login-input"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      required
                      name="password"
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
                <span className="password-error-span error-span"></span>
              </section>
              <div className="Login-Button-div">
                <button type="submit" className="Login-Button">
                  {buttons[language].login}
                </button>
              </div>
              <section className="gotodifferntlink">
                <a
                  href="/register"
                  className="login-new-customer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                >
                  {formLinks[language].register}
                </a>
                <a
                  href="/forgot-password"
                  className="login-forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/forgot-password');
                  }}
                >
                  {formLinks[language].forgot}
                </a>
              </section>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;