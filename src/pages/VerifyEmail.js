import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/styles.css';

function VerifyEmail({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [email, setEmail] = useState('');

  const textLabels = {
    sv: {
      title: 'E-postverifiering',
      subtitle: 'Kontrollera din e-post',
      message: 'Vi har skickat en verifieringslänk till din e-postadress.',
      instruction: 'Klicka på länken i e-postmeddelandet för att aktivera ditt konto.',
      redirectMessage: 'Du kommer automatiskt att omdirigeras till inloggningssidan om',
      seconds: 'sekunder',
      checkEmail: 'Kontrollera din e-post',
      resendEmail: 'Skicka e-post igen',
      backToLogin: 'Tillbaka till inloggning',
    },
    en: {
      title: 'Email Verification',
      subtitle: 'Check Your Email',
      message: 'We have sent a verification link to your email address.',
      instruction: 'Click the link in the email to activate your account.',
      redirectMessage: 'You will be automatically redirected to the login page in',
      seconds: 'seconds',
      checkEmail: 'Check Your Email',
      resendEmail: 'Resend Email',
      backToLogin: 'Back to Login',
    },
  };

  const t = textLabels[language] || textLabels.en;

  useEffect(() => {
    // Get email from state
    if (location.state?.email) {
      setEmail(location.state.email);
    }

    // Check if there's a token in URL (from email link)
    const token = new URLSearchParams(location.search).get('token');
    if (token) {
      // Redirect to verify component to handle the token
      navigate(`/verify?token=${token}`);
      return;
    }

    // Countdown timer to redirect to login
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location, navigate]);

  const handleResendEmail = () => {
    // This would typically call a resend email API
    alert('Verification email has been resent!');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="app-container">
      <HamburgerMenu language={language} />
      
      <div className="main-content">
        <div className="content">
          <div className="page-header">
            <h1>{t.title}</h1>
          </div>

          <div className="verify-email-content">
            <div className="verify-card">
              <div className="verify-icon">
                📧
              </div>
              
              <h2>{t.subtitle}</h2>
              
              <div className="verify-message">
                <p>{t.message}</p>
                {email && <p><strong>Email: {email}</strong></p>}
                <p>{t.instruction}</p>
              </div>

              <div className="verify-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleResendEmail}
                >
                  {t.resendEmail}
                </button>
                
                <button 
                  className="btn btn-secondary"
                  onClick={handleBackToLogin}
                >
                  {t.backToLogin}
                </button>
              </div>

              <div className="verify-countdown">
                <p>{t.redirectMessage} {countdown} {t.seconds}</p>
              </div>
            </div>

            <div className="verify-tips">
              <h3>Tips:</h3>
              <ul>
                <li>Kontrollera din skräppost-mapp om du inte ser e-postmeddelandet</li>
                <li>E-postmeddelandet kan ta några minuter att komma fram</li>
                <li>Kontakta support om du inte får e-postmeddelandet inom 10 minuter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .verify-email-content {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .verify-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          margin-bottom: 30px;
        }

        .verify-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .verify-card h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 28px;
        }

        .verify-message {
          margin-bottom: 30px;
          color: #555;
          line-height: 1.6;
        }

        .verify-message p {
          margin-bottom: 10px;
        }

        .verify-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .verify-actions .btn {
          padding: 12px 24px;
          font-size: 16px;
        }

        .verify-countdown {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          color: #666;
          font-style: italic;
        }

        .verify-tips {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #2196f3;
        }

        .verify-tips h3 {
          color: #1976d2;
          margin-bottom: 15px;
        }

        .verify-tips ul {
          margin: 0;
          padding-left: 20px;
          color: #555;
        }

        .verify-tips li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .verify-card {
            padding: 30px 20px;
          }
          
          .verify-actions {
            flex-direction: column;
          }
          
          .verify-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;
