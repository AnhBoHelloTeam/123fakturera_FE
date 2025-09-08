import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/myBusinessStyles.css';

function MyBusiness({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    companyName: '',
    contactPerson: '',
    address: '',
    address2: '',
    postNumber: '',
    city: '',
    mobile: '',
    email: '',
    accountNumber: '',
    orgNumber: '',
    homepage: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sidebar menu links
  const sidebarLinks = {
    sv: [
      { text: 'Fakturor', icon: '📄', path: '/invoices' },
      { text: 'Kundregister', icon: '👥', path: '/customers' },
      { text: 'Mitt Företag', icon: '🏢', path: '/mybusiness', active: true },
      { text: 'Fakturalog', icon: '📜', path: '/invoice-journal' },
      { text: 'Prislista', icon: '💰', path: '/price-list' },
      { text: 'Massfakturering', icon: '🧾', path: '/multiple-invoicing' },
      { text: 'Obetalda Fakturor', icon: '💸', path: '/unpaid-invoices' },
      { text: 'Erbjudande', icon: '🎁', path: '/offer' },
      { text: 'Lagerhantering', icon: '📦', path: '/inventory' },
      { text: 'Medlemsfakturering', icon: '🔑', path: '/member-invoicing' },
      { text: 'Import & Export', icon: '📊', path: '/import-export' },
      { text: 'Support', icon: '📞', path: '/support' },
      { text: 'Logga ut', icon: '🚪', path: '/logout' },
    ],
    en: [
      { text: 'Invoices', icon: '📄', path: '/invoices' },
      { text: 'Customer register', icon: '👥', path: '/customers' },
      { text: 'My Business', icon: '🏢', path: '/mybusiness', active: true },
      { text: 'Invoice journal', icon: '📜', path: '/invoice-journal' },
      { text: 'Price List', icon: '💰', path: '/price-list' },
      { text: 'Multiple Invoicing', icon: '🧾', path: '/multiple-invoicing' },
      { text: 'Unpaid invoices', icon: '💸', path: '/unpaid-invoices' },
      { text: 'Offer', icon: '🎁', path: '/offer' },
      { text: 'Inventory Control', icon: '📦', path: '/inventory' },
      { text: 'Member Invoicing', icon: '🔑', path: '/member-invoicing' },
      { text: 'Import & Export', icon: '📊', path: '/import-export' },
      { text: 'Support', icon: '📞', path: '/support' },
      { text: 'Log Out', icon: '🚪', path: '/logout' },
    ],
  };

  // Text labels for localization
  const textLabels = {
    sv: {
      businessDetailsTitle: 'Företagsdetaljer',
      settingsTitle: 'Inställningar',
      standardTextsTitle: 'Standardtexter',
      goToInvoices: 'Gå till fakturor',
      menu: 'Meny',
      formHeader: 'Dina företagsdetaljer.',
      formSubHeader: 'För att uppdatera dem - bara ändra dem.',
      name: 'Namn',
      address: 'Adress',
      address2: 'Adress 2',
      postcode: 'Postnummer',
      city: 'Ort',
      ourReference: 'Vår referens',
      mobile: 'Mobil',
      email: 'E-post',
      accountNumber: 'Kontonummer',
      orgNumber: 'Org. Nummer',
      homepage: 'Hemsida',
      homepageHelp: 'Visas inte på fakturor om blank',
      settingsHelp: 'Klicka på Inställningar för att välja faktura nummer att starta på och andra inställningar.',
      ourLogo: 'Vår logga',
      useLogo: 'Använd logga',
      yes: 'Ja',
      no: 'Nej',
      chooseLogo: 'Välj logga',
      uploadNew: 'Ladda upp ny',
      previewLogo: 'Förhandsvisa logga',
      preview: 'Förhandsvisa',
      profilePicture: 'Profilbild',
      editOriginal: 'Ändra original',
      enterAddress2: 'Skriv in Adress 2',
      enterAccountNumber: 'Skriv in kontonummer',
      enterOrgNumber: 'Skriv in org. nummer',
      save: 'Spara',
      delete: 'Radera konto',
    },
    en: {
      businessDetailsTitle: 'Business Details',
      settingsTitle: 'Settings',
      standardTextsTitle: 'Standard texts',
      goToInvoices: 'Go to invoices',
      menu: 'Menu',
      formHeader: 'Your business details.',
      formSubHeader: 'To update them - just change them.',
      name: 'Name',
      address: 'Address',
      address2: 'Address 2',
      postcode: 'Postcode',
      city: 'City',
      ourReference: 'Our reference',
      mobile: 'Phone',
      email: 'Email',
      accountNumber: 'Account no.',
      orgNumber: 'Org Number',
      homepage: 'Homepage',
      homepageHelp: 'Will not show on invoices if left empty',
      settingsHelp: 'Click Settings to chose invoice number to start with and other settings.',
      ourLogo: 'Our Logo',
      useLogo: 'Use logo',
      yes: 'Yes',
      no: 'No',
      chooseLogo: 'Choose Logo',
      uploadNew: 'Upload new',
      previewLogo: 'Preview logo',
      preview: 'Preview',
      profilePicture: 'Profile picture',
      editOriginal: 'Edit Original',
      enterAddress2: 'Enter Address 2',
      enterAccountNumber: 'Enter account number',
      enterOrgNumber: 'Enter org number',
      save: 'Save',
      delete: 'Delete account',
    },
  };

  const t = textLabels[language] || textLabels.en;

  // Header tabs configuration
  const headerTabs = {
    desktop: [
      { id: 'businessDetails', text: t.businessDetailsTitle, path: '/mybusiness', active: true },
      { id: 'settings', text: t.settingsTitle, path: '/settings', active: false },
      { id: 'standardTexts', text: t.standardTextsTitle, path: '/standard-texts', active: false },
      { id: 'goToInvoices', text: t.goToInvoices, path: '/invoices', specialClass: 'go-to-invoices' },
    ],
    mobile: [
      { id: 'businessDetails', text: t.businessDetailsTitle, path: '/mybusiness', active: true },
      { id: 'settings', text: t.settingsTitle, path: '/settings', active: false },
      { id: 'standardTexts', text: t.standardTextsTitle, path: '/standard-texts', active: false },
    ],
  };

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
        navigate('/login');
        return;
      }

      try {
        console.log('Fetching user data with token:', token);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/mybusiness`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', response.data);
        setUserData({
          companyName: response.data.companyName || '',
          contactPerson: response.data.contactPerson || '',
          address: response.data.address || '',
          address2: response.data.address2 || '',
          postNumber: response.data.postNumber || '',
          city: response.data.city || '',
          mobile: response.data.mobile || '',
          email: response.data.email || '',
          accountNumber: response.data.accountNumber || '',
          orgNumber: response.data.orgNumber || '',
          homepage: response.data.homepage || '',
        });
      } catch (err) {
        console.error('API error:', err.response?.data || err.message);
        setError('Không thể lấy dữ liệu người dùng. ' + (err.response?.data?.error || err.message));
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/mybusiness`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Save response:', response.data);
      setUserData(response.data); // Update state with server response
      setError(null);
      alert(t.save + ' thành công!'); // Show success message
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      setError('Không thể lưu dữ liệu người dùng. ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t.delete + '? Hành động này không thể hoàn tác.')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Không tìm thấy token xác thực. Vui lòng đăng nhập.');
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/mybusiness`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      navigate('/login');
      alert(t.delete + ' thành công!');
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError('Không thể xóa tài khoản. ' + (err.response?.data?.error || err.message));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="mybusiness-container">
      <header className="header">
        <div className="header-left">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="logo"
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer' }}
          />
          <div className="hamburger-menu-wrapper">
            <button className="hamburger-menu" onClick={toggleDropdown}>
              ☰
            </button>
            <span className="menu-text">{t.menu}</span>
            <ul className={`hamburger-menu-dropdown ${isDropdownOpen ? 'active' : ''}`}>
              {sidebarLinks[language].map((link, index) => (
                <li key={index}>
                  <a href={link.path}>
                    <span className="sidebar-icon">{link.icon}</span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="nav-links desktop-nav">
            <ul>
              {headerTabs.desktop.map(tab => (
                <li key={tab.id} className={`nav-link-item ${tab.active ? 'active' : ''} ${tab.specialClass || ''}`}>
                  <span>{tab.text}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <div className="language-switcher">
            <img
              src="https://storage.123fakturere.no/public/flags/GB.png"
              alt="English"
              className={language === 'en' ? 'flag active' : 'flag'}
              onClick={() => setLanguage('en')}
            />
            <img
              src="https://storage.123fakturere.no/public/flags/SE.png"
              alt="Swedish"
              className={language === 'sv' ? 'flag active' : 'flag'}
              onClick={() => setLanguage('sv')}
            />
          </div>
        </div>
      </header>
      <main className="mybusiness-main">
        <aside className="sidebar">
          <h3 className="sidebar-heading">{t.menu}</h3>
          <ul>
            {sidebarLinks[language].map((link, index) => (
              <li key={index} className={link.active ? 'active' : ''}>
                <a href={link.path}>
                  <span className="sidebar-icon">{link.icon}</span>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="content-area">
          <div className="mybusiness-grid">
            <div className="mybusiness-left-panel panel">
              <h3 className="panel-title">{t.formHeader}</h3>
              <p className="panel-subtitle">{t.formSubHeader}</p>
              <div className="form-group">
                <label>{t.name}</label>
                <input
                  type="text"
                  name="companyName"
                  value={userData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>{t.address}</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>{t.address2}</label>
                <input
                  type="text"
                  name="address2"
                  value={userData.address2}
                  onChange={handleInputChange}
                  placeholder={t.enterAddress2}
                />
              </div>
              <div className="form-group form-group-inline">
                <div className="inline-field">
                  <label>{t.postcode}</label>
                  <input
                    type="text"
                    name="postNumber"
                    value={userData.postNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="inline-field">
                  <label>{t.city}</label>
                  <input
                    type="text"
                    name="city"
                    value={userData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>{t.ourReference}</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={userData.contactPerson}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>{t.mobile}</label>
                <input
                  type="text"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>{t.accountNumber}</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={userData.accountNumber}
                  onChange={handleInputChange}
                  placeholder={t.enterAccountNumber}
                />
              </div>
              <div className="form-group">
                <label>{t.orgNumber}</label>
                <input
                  type="text"
                  name="orgNumber"
                  value={userData.orgNumber}
                  onChange={handleInputChange}
                  placeholder={t.enterOrgNumber}
                />
              </div>
              <div className="form-group">
                <label>{t.homepage}</label>
                <input
                  type="text"
                  name="homepage"
                  value={userData.homepage}
                  onChange={handleInputChange}
                />
                <p className="help-text">{t.homepageHelp}</p>
              </div>
              <p className="help-text-link">{t.settingsHelp}</p>
              <div className="form-group">
                <button className="btn-save" onClick={handleSave}>{t.save}</button>
                <button className="btn-delete" onClick={handleDelete}>{t.delete}</button>
              </div>
              {error && <span className="error-span">{error}</span>}
            </div>
            <div className="mybusiness-right-panel">
              <div className="panel">
                <h3 className="panel-title">{t.ourLogo}</h3>
                <div className="logo-section">
                  <div className="current-logo">
                    <img src="https://storage.123fakturera.se/public/logos/logotype.png" alt="Current Logo" />
                    <span>Ert Företagsnamn AB</span>
                  </div>
                  <div className="logo-controls">
                    <label className="logo-label">{t.useLogo}</label>
                    <div className="toggle-switch">
                      <button className="toggle-btn active">{t.yes}</button>
                      <button className="toggle-btn">{t.no}</button>
                    </div>
                  </div>
                  <div className="logo-upload">
                    <label className="logo-label">{t.chooseLogo}</label>
                    <button className="btn-upload">{t.uploadNew}</button>
                  </div>
                  <div className="logo-preview">
                    <label className="logo-label">{t.previewLogo}</label>
                    <button className="btn-preview">{t.preview}</button>
                  </div>
                </div>
              </div>
              <div className="panel profile-picture-panel">
                <h3 className="panel-title">{t.profilePicture}</h3>
                <div className="profile-image-container">
                  <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Profile" />
                </div>
                <div className="profile-controls">
                  <button className="btn-edit">{t.editOriginal}</button>
                  <button className="btn-upload">{t.uploadNew}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyBusiness;