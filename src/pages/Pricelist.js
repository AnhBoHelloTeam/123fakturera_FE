import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/priceListStyles.css';

function PriceList({ language, setLanguage }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchArticle, setSearchArticle] = useState('');
    const [priceData, setPriceData] = useState([
        { articleNo: '1234567890', product: 'This is a test product with fifty characters this!', price: '1500800', inStock: '1500800', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: '1234567890', product: 'This is a test product with fifty characters this!', price: '1500800', inStock: '2500600', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: 'Sony DSLR 12345', product: 'Sony DSLR 12345', price: '15000', inStock: '15000', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: 'Random product', product: 'Random product', price: '1234', inStock: '2500600', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
    ]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleArticleSearchChange = (e) => {
        setSearchArticle(e.target.value);
    };

    const textLabels = {
        sv: {
            menu: 'Meny',
            invoices: 'Fakturor',
            customers: 'Kundregister',
            myBusiness: 'Mitt Företag',
            invoiceJournal: 'Fakturalog',
            priceList: 'Prislista',
            multipleInvoicing: 'Massfakturering',
            unpaidInvoices: 'Obetalda Fakturor',
            offer: 'Erbjudande',
            inventoryControl: 'Lagerhantering',
            memberInvoicing: 'Medlemsfakturering',
            importExport: 'Import & Export',
            logOut: 'Logga ut',
            searchArticleNo: 'Sök Artikel Nr...',
            searchProduct: 'Sök Produkt...',
            newProduct: 'Ny produkt',
            printList: 'Skriv ut lista',
            advancedMode: 'Avancerat läge',
            articleNo: 'Artikel Nr.',
            productService: 'Produkt/Tjänst',
            inPrice: 'In Pris',
            price: 'Pris',
            unit: 'Enhet',
            inStock: 'I Lager',
            description: 'Beskrivning',
            searchPlaceholder: 'Sök...',
        },
        en: {
            menu: 'Menu',
            invoices: 'Invoices',
            customers: 'Customer register',
            myBusiness: 'My Business',
            invoiceJournal: 'Invoice journal',
            priceList: 'Price List',
            multipleInvoicing: 'Multiple Invoicing',
            unpaidInvoices: 'Unpaid invoices',
            offer: 'Offer',
            inventoryControl: 'Inventory Control',
            memberInvoicing: 'Member Invoicing',
            importExport: 'Import & Export',
            logOut: 'Log Out',
            searchArticleNo: 'Search Article No.',
            searchProduct: 'Search Product...',
            newProduct: 'New Product',
            printList: 'Print List',
            advancedMode: 'Advanced mode',
            articleNo: 'Article No.',
            productService: 'Product/Service',
            inPrice: 'In Price',
            price: 'Price',
            unit: 'Unit',
            inStock: 'In Stock',
            description: 'Description',
            searchPlaceholder: 'Search...',
        },
    };

    const t = textLabels[language] || textLabels.en;

    const sidebarLinks = [
        { text: t.invoices, icon: '📄', path: '/invoices' },
        { text: t.customers, icon: '👥', path: '/customers' },
        { text: t.myBusiness, icon: '🏢', path: '/mybusiness' },
        { text: t.invoiceJournal, icon: '📜', path: '/invoice-journal' },
        { text: t.priceList, icon: '💰', path: '/price-list', active: true },
        { text: t.multipleInvoicing, icon: '🧾', path: '/multiple-invoicing' },
        { text: t.unpaidInvoices, icon: '💸', path: '/unpaid-invoices' },
        { text: t.offer, icon: '🎁', path: '/offer' },
        { text: t.inventoryControl, icon: '📦', path: '/inventory' },
        { text: t.memberInvoicing, icon: '🔑', path: '/member-invoicing' },
        { text: t.importExport, icon: '📊', path: '/import-export' },
        { text: t.logOut, icon: '🚪', path: '/logout' },
    ];

    return (
        <div className="price-list-container">
            <header className="header">
                <div className="header-left">
                    <img
                        src="https://storage.123fakturera.se/public/icons/diamond.png"
                        alt="Logo"
                        className="logo"
                        onClick={() => navigate('/login')}
                        style={{ cursor: 'pointer' }}
                    />
                    {isDesktop && (
                        <div className="user-profile">
                            <div className="user-info">
                                <span>John Andre</span>
                                <span>Storford AS</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="header-right">
                    <div className="hamburger-menu-wrapper">
                        <HamburgerMenu language={language} headerLinks={sidebarLinks} />
                    </div>
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

            <main className="main-content">
                {isDesktop && (
                    <aside className="sidebar">
                        <h3 className="sidebar-heading">{t.menu}</h3>
                        <ul>
                            {sidebarLinks.map((link, index) => (
                                <li key={index} className={link.active ? 'active' : ''}>
                                    <a href={link.path}>
                                        <span className="sidebar-icon">{link.icon}</span>
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}

                <div className="price-list-area">
                    <div className="controls">
                        <div className="search-inputs">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder={t.searchArticleNo}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <span className="search-icon">🔍</span>
                            </div>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder={t.searchProduct}
                                    value={searchArticle}
                                    onChange={handleArticleSearchChange}
                                />
                                <span className="search-icon">🔍</span>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="icon-btn new-product">
                                <span>+</span>
                                {!isMobile && <span>{t.newProduct}</span>}
                            </button>
                            <button className="icon-btn print-list">
                                <span>🖨️</span>
                                {!isMobile && <span>{t.printList}</span>}
                            </button>
                            <button className="icon-btn advanced-mode">
                                <span>⚙️</span>
                                {!isMobile && <span>{t.advancedMode}</span>}
                            </button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t.articleNo} ↓</th>
                                    <th>{t.productService} ↓</th>
                                    {isDesktop && <th>{t.inPrice}</th>}
                                    <th>{t.price}</th>
                                    {!isMobile && <th>{t.unit}</th>}
                                    {!isMobile && <th>{t.inStock}</th>}
                                    {isDesktop && <th>{t.description}</th>}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceData.map((item, index) => (
                                    <tr key={index}>
                                        <td data-label={t.articleNo}>
                                            <div className="cell-content">
                                                <span className="arrow-icon">→</span>
                                                <input type="text" value={item.articleNo} readOnly />
                                            </div>
                                        </td>
                                        <td data-label={t.productService}>
                                            <div className="cell-content">
                                                <input type="text" value={item.product} readOnly />
                                            </div>
                                        </td>
                                        {isDesktop && <td data-label={t.inPrice}><input type="text" value={item.inPrice} readOnly /></td>}
                                        <td data-label={t.price}><input type="text" value={item.price} readOnly /></td>
                                        {!isMobile && <td data-label={t.unit}><input type="text" value={item.unit} readOnly /></td>}
                                        {!isMobile && <td data-label={t.inStock}><input type="text" value={item.inStock} readOnly /></td>}
                                        {isDesktop && <td data-label={t.description}><input type="text" value={item.description} readOnly /></td>}
                                        <td><button className="more-options">...</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PriceList;