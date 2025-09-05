import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/priceListStyles.module.css';

function PriceList({ language, setLanguage }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchArticle, setSearchArticle] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(null); // State cho dropdown
    const [priceData] = useState([
        { articleNo: '1234567890', product: 'This is a test product with fifty characters this!', inPrice: '900500', price: '1500800', inStock: '2500600', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: '1234567890', product: 'This is a test product with fifty characters this!', inPrice: '900500', price: '1500800', inStock: '2500600', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: 'Sony DSLR 12345', product: 'Sony DSLR 12345', inPrice: '900500', price: '15000', inStock: '15000', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
        { articleNo: 'Random product', product: 'Random product', inPrice: '', price: '1234', inStock: '2500600', unit: 'kilometers/hour', description: 'This is the description with fifty characters this' },
    ]);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const [isMobileLandscape, setIsMobileLandscape] = useState(window.innerWidth >= 481 && window.innerWidth < 768);
    const [isMobilePortrait, setIsMobilePortrait] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
            setIsMobileLandscape(window.innerWidth >= 481 && window.innerWidth < 768);
            setIsMobilePortrait(window.innerWidth <= 480);
            setIsMenuOpen(false);
            setOpenMenuIndex(null); // Đóng dropdown khi resize
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleDropdown = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setOpenMenuIndex(null);
    };

    const handleEdit = (index) => {
        console.log(`Edit product at index ${index}`);
        closeDropdown();
    };

    const handleDelete = (index) => {
        console.log(`Delete product at index ${index}`);
        closeDropdown();
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
            searchArticleNo: 'Sök Artikel Nr.',
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
            close: 'Close',
            editProduct: 'Edit Product',
            deleteProduct: 'Delete Product',
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
            close: 'Close',
            editProduct: 'Edit Product',
            deleteProduct: 'Delete Product',
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

    const getPriceColumns = () => {
        if (isDesktop) {
            return (
                <>
                    <th>{t.articleNo} ↓</th>
                    <th>{t.productService} ↓</th>
                    <th>{t.inPrice}</th>
                    <th>{t.price}</th>
                    <th>{t.unit}</th>
                    <th>{t.inStock}</th>
                    <th>{t.description}</th>
                    <th></th>
                </>
            );
        } else if (isTablet) {
            return (
                <>
                    <th>{t.articleNo} ↓</th>
                    <th>{t.productService} ↓</th>
                    <th>{t.price}</th>
                    <th></th>
                </>
            );
        } else {
            return (
                <>
                    <th>{t.productService} ↓</th>
                    <th>{t.price}</th>
                    <th></th>
                </>
            );
        }
    };

    const getPriceRows = () => {
        return priceData.map((item, index) => {
            const isOpen = openMenuIndex === index;
            if (isMobilePortrait || isMobileLandscape) {
                return (
                    <tr key={index}>
                        <td>
                            <div className={styles.priceCellContent}>
                                <input type="text" value={item.product} readOnly />
                            </div>
                        </td>
                        <td><input type="text" value={item.price} readOnly /></td>
                        <td style={{ position: 'relative' }}>
                            <button className={styles.priceMoreOptions} onClick={() => toggleDropdown(index)}>...</button>
                            {isOpen && (
                                <div className={styles.priceDropdownMenu}>
                                    <button onClick={closeDropdown}>{t.close}</button>
                                    <button onClick={() => handleEdit(index)}>{t.editProduct}</button>
                                    <button onClick={() => handleDelete(index)}>{t.deleteProduct}</button>
                                </div>
                            )}
                        </td>
                    </tr>
                );
            } else if (isTablet) {
                return (
                    <tr key={index}>
                        <td>
                            <div className={styles.priceCellContent}>
                                <span className={styles.priceArrowIcon}>→</span>
                                <input type="text" value={item.articleNo} readOnly />
                            </div>
                        </td>
                        <td>
                            <div className={styles.priceCellContent}>
                                <input type="text" value={item.product} readOnly />
                            </div>
                        </td>
                        <td><input type="text" value={item.price} readOnly /></td>
                        <td style={{ position: 'relative' }}>
                            <button className={styles.priceMoreOptions} onClick={() => toggleDropdown(index)}>...</button>
                            {isOpen && (
                                <div className={styles.priceDropdownMenu}>
                                    <button onClick={closeDropdown}>{t.close}</button>
                                    <button onClick={() => handleEdit(index)}>{t.editProduct}</button>
                                    <button onClick={() => handleDelete(index)}>{t.deleteProduct}</button>
                                </div>
                            )}
                        </td>
                    </tr>
                );
            } else {
                return (
                    <tr key={index}>
                        <td>
                            <div className={styles.priceCellContent}>
                                <span className={styles.priceArrowIcon}>→</span>
                                <input type="text" value={item.articleNo} readOnly />
                            </div>
                        </td>
                        <td>
                            <div className={styles.priceCellContent}>
                                <input type="text" value={item.product} readOnly />
                            </div>
                        </td>
                        <td><input type="text" value={item.inPrice || ''} readOnly /></td>
                        <td><input type="text" value={item.price} readOnly /></td>
                        <td><input type="text" value={item.unit} readOnly /></td>
                        <td><input type="text" value={item.inStock} readOnly /></td>
                        <td><input type="text" value={item.description} readOnly /></td>
                        <td style={{ position: 'relative' }}>
                            <button className={styles.priceMoreOptions} onClick={() => toggleDropdown(index)}>...</button>
                            {isOpen && (
                                <div className={styles.priceDropdownMenu}>
                                    <button onClick={closeDropdown}>{t.close}</button>
                                    <button onClick={() => handleEdit(index)}>{t.editProduct}</button>
                                    <button onClick={() => handleDelete(index)}>{t.deleteProduct}</button>
                                </div>
                            )}
                        </td>
                    </tr>
                );
            }
        });
    };

    return (
        <div className={styles.priceListContainer}>
            <header className={styles.priceHeader}>
                <div className={styles.priceHeaderLeft}>
                    <button className={styles.menuIcon} onClick={toggleMenu}>☰</button>
                    {isDesktop && (
                        <div className={styles.priceUserProfile}>
                            <img src="https://storage.123fakturere.no/public/avatars/user_avatar.png" alt="User Avatar" className={styles.userAvatar} />
                            <div className={styles.priceUserInfo}>
                                <span>John Andre</span>
                                <span>Storford AS</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.priceHeaderRight}>
                    <div className={styles.priceLanguageSwitcher}>
                        <img
                            src="https://storage.123fakturere.no/public/flags/GB.png"
                            alt="English"
                            className={language === 'en' ? `${styles.priceFlag} ${styles.active}` : styles.priceFlag}
                            onClick={() => setLanguage('en')}
                        />
                        <img
                            src="https://storage.123fakturere.no/public/flags/SE.png"
                            alt="Swedish"
                            className={language === 'sv' ? `${styles.priceFlag} ${styles.active}` : styles.priceFlag}
                            onClick={() => setLanguage('sv')}
                        />
                    </div>
                </div>
            </header>

            {isMenuOpen && (isTablet || isMobileLandscape || isMobilePortrait) && (
                <>
                    <div className={styles.priceMobileMenuOverlay} onClick={closeMenu}></div>
                    <div className={`${styles.priceMobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                        <div className={styles.priceMobileMenuContent}>
                            <button className={styles.priceMobileMenuClose} onClick={closeMenu}>✕</button>
                            <h3 className={styles.priceSidebarHeading}>{t.menu}</h3>
                            <ul>
                                {sidebarLinks.map((link, index) => (
                                    <li key={index} className={link.active ? `${styles.active}` : ''}>
                                        <a href={link.path} onClick={closeMenu}>
                                            <span className={styles.priceSidebarIcon}>{link.icon}</span>
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {openMenuIndex !== null && (
                <div className={styles.priceDropdownOverlay} onClick={closeDropdown}></div>
            )}

            <main className={styles.priceMainContent}>
                {isDesktop && (
                    <aside className={styles.priceSidebar}>
                        <h3 className={styles.priceSidebarHeading}>{t.menu}</h3>
                        <ul>
                            {sidebarLinks.map((link, index) => (
                                <li key={index} className={link.active ? `${styles.active}` : ''}>
                                    <a href={link.path}>
                                        <span className={styles.priceSidebarIcon}>{link.icon}</span>
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}

                <div className={styles.priceListArea}>
                    <div className={styles.priceControls}>
                        <div className={styles.priceSearchInputs}>
                            <div className={styles.priceSearchBar}>
                                <input
                                    type="text"
                                    placeholder={t.searchArticleNo}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <span className={styles.priceSearchIcon}>🔍</span>
                            </div>
                            <div className={styles.priceSearchBar}>
                                <input
                                    type="text"
                                    placeholder={t.searchProduct}
                                    value={searchArticle}
                                    onChange={handleArticleSearchChange}
                                />
                                <span className={styles.priceSearchIcon}>🔍</span>
                            </div>
                        </div>
                        <div className={styles.priceActionButtons}>
                            <button className={`${styles.priceIconBtn} ${styles.newProduct}`}>
                                <span>+</span>
                                {!(isMobileLandscape || isMobilePortrait) && <span>{t.newProduct}</span>}
                            </button>
                            <button className={`${styles.priceIconBtn} ${styles.printList}`}>
                                <span>🖨️</span>
                                {!(isMobileLandscape || isMobilePortrait) && <span>{t.printList}</span>}
                            </button>
                            <button className={`${styles.priceIconBtn} ${styles.advancedMode}`}>
                                <span>⚙️</span>
                                {!(isMobileLandscape || isMobilePortrait) && <span>{t.advancedMode}</span>}
                            </button>
                        </div>
                    </div>

                    <div className={styles.priceTableContainer}>
                        <table className={styles.priceTable}>
                            <thead className={styles.priceThead}>
                                <tr>
                                    {getPriceColumns()}
                                </tr>
                            </thead>
                            <tbody className={styles.priceTbody}>
                                {getPriceRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PriceList;