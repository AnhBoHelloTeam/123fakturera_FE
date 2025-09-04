import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu'; 
import '../assets/myBusinessStyles.css';

function MyBusiness({ language, setLanguage, headerLinks }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        address2: '',
        postcode: '',
        city: '',
        ourReference: '',
        mobile: '',
        email: '',
        accountNumber: '',
        orgNumber: '',
        homepage: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                setError('No authentication token found. Please log in.');
                navigate('/login');
                return;
            }

            try {
                console.log('Fetching user data with token:', token); // Debug token
                const response = await axios.get('http://localhost:3001/api/mybusiness', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('API response:', response.data); // Debug response
                const data = response.data; // Lấy dữ liệu trực tiếp từ response.data
                setUserData({
                    name: data.companyName || '',
                    address: data.address || '',
                    address2: data.address2 || '',
                    postcode: data.postNumber || '',
                    city: data.city || '',
                    ourReference: data.contactPerson || '',
                    mobile: data.mobile || '',
                    email: data.email || '',
                    accountNumber: data.accountNumber || '',
                    orgNumber: data.orgNumber || '',
                    homepage: data.homepage || '',
                });
            } catch (err) {
                console.error('API error:', err.response?.data || err.message); // Debug error
                setError('Failed to fetch user data. ' + (err.response?.data?.error || err.message));
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

    if (isLoading) {
        return <div className="loading">Loading...</div>;
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
                    <HamburgerMenu language={language} headerLinks={sidebarLinks[language]} />
                    <span className="menu-text">{t.menu}</span>
                </div>
                {/* Giữ lại nav desktop với 4 mục chính */}
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
                {/* Xóa hoàn toàn nav mobile để không còn các mục lặp lại */}
                {/* <nav className="nav-links mobile-nav">
                    <ul>
                        {headerTabs.mobile.map(tab => (
                            <li key={tab.id} className={`nav-link-item ${tab.active ? 'active' : ''}`}>
                                <span>{tab.text}</span>
                            </li>
                        ))}
                    </ul>
                </nav> */}
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
                                    name="name"
                                    value={userData.name}
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
                                        name="postcode"
                                        value={userData.postcode}
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
                                    name="ourReference"
                                    value={userData.ourReference}
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