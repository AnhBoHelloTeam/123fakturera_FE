import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/priceListStyles.module.css';

function PriceList({ language, setLanguage }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    article_no: '',
    name: '',
    in_price: '',
    price: '',
    unit: '',
    in_stock: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      setOpenMenuIndex(null);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(language === 'sv' ? 'Ingen autentiseringstoken hittades. Vänligen logga in.' : 'No authentication token found. Please log in.');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || (language === 'sv' ? 'Misslyckades att hämta produkter.' : 'Failed to fetch products.'));
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = {
        article_no: formData.article_no,
        name: formData.name,
        in_price: formData.in_price ? parseFloat(formData.in_price) : null,
        price: parseFloat(formData.price),
        unit: formData.unit || null,
        in_stock: formData.in_stock ? parseInt(formData.in_stock) : null,
        description: formData.description || null,
      };
      if (!data.article_no || !data.name || !data.price) {
        setError(language === 'sv' ? 'Artikelnummer, namn och pris är obligatoriska.' : 'Article number, name, and price are required.');
        return;
      }
      if (formData.id) {
        // Update
        await axios.put(`http://localhost:3001/api/products/${formData.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess(language === 'sv' ? 'Produkt uppdaterad framgångsrikt.' : 'Product updated successfully.');
      } else {
        // Create
        await axios.post('http://localhost:3001/api/products', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess(language === 'sv' ? 'Produkt skapad framgångsrikt.' : 'Product created successfully.');
      }
      setIsFormOpen(false);
      setFormData({ id: null, article_no: '', name: '', in_price: '', price: '', unit: '', in_stock: '', description: '' });
      setError(null);
      const response = await axios.get('http://localhost:3001/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || (language === 'sv' ? 'Misslyckades att spara produkt.' : 'Failed to save product.'));
    }
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleEdit = (index) => {
    const product = products[index];
    setFormData({
      id: product.id,
      article_no: product.article_no || '',
      name: product.name || '',
      in_price: product.in_price || '',
      price: product.price || '',
      unit: product.unit || '',
      in_stock: product.in_stock || '',
      description: product.description || '',
    });
    setIsFormOpen(true);
    closeDropdown();
  };

  const handleDelete = async (index) => {
    if (!window.confirm(language === 'sv' ? 'Är du säker på att du vill radera produkten?' : 'Are you sure you want to delete this product?')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/products/${products[index].id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(language === 'sv' ? 'Produkt raderad framgångsrikt.' : 'Product deleted successfully.');
      const response = await axios.get('http://localhost:3001/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      closeDropdown();
    } catch (err) {
      setError(err.response?.data?.error || (language === 'sv' ? 'Misslyckades att radera produkt.' : 'Failed to delete product.'));
    }
    setTimeout(() => setSuccess(null), 3000);
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
      searchProduct: 'Sök Produkt...',
      newProduct: 'Ny produkt',
      printList: 'Skriv ut lista',
      advancedMode: 'Avancerat läge',
      articleNo: 'Artikelnummer',
      productService: 'Produkt/Tjänst',
      inPrice: 'In Pris',
      price: 'Pris',
      unit: 'Enhet',
      inStock: 'I Lager',
      description: 'Beskrivning',
      close: 'Stäng',
      editProduct: 'Redigera Produkt',
      deleteProduct: 'Radera Produkt',
      saveProduct: 'Spara Produkt',
      cancel: 'Avbryt',
      name: 'Namn',
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
      searchProduct: 'Search Product...',
      newProduct: 'New Product',
      printList: 'Print List',
      advancedMode: 'Advanced mode',
      articleNo: 'Article No.',
      productService: 'Product/Service',
      inPrice: 'InRobin Price',
      price: 'Price',
      unit: 'Unit',
      inStock: 'In Stock',
      description: 'Description',
      close: 'Close',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      saveProduct: 'Save Product',
      cancel: 'Cancel',
      name: 'Name',
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
          <th>{t.productService}</th>
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
          <th>{t.productService}</th>
          <th>{t.price}</th>
          <th>{t.unit}</th>
          <th>{t.inStock}</th>
          <th></th>
        </>
      );
    } else {
      return (
        <>
          <th>{t.productService}</th>
          <th>{t.price}</th>
          <th></th>
        </>
      );
    }
  };

  const getPriceRows = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredProducts.map((item, index) => {
      const isOpen = openMenuIndex === index;
      if (isMobilePortrait || isMobileLandscape) {
        return (
          <tr key={item.id}>
            <td>
              <div className={styles.priceCellContent}>
                <input type="text" value={item.name} readOnly />
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
          <tr key={item.id}>
            <td>
              <div className={styles.priceCellContent}>
                <input type="text" value={item.article_no} readOnly />
              </div>
            </td>
            <td>
              <div className={styles.priceCellContent}>
                <input type="text" value={item.name} readOnly />
              </div>
            </td>
            <td><input type="text" value={item.price} readOnly /></td>
            <td><input type="text" value={item.unit || ''} readOnly /></td>
            <td><input type="text" value={item.in_stock || ''} readOnly /></td>
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
          <tr key={item.id}>
            <td>
              <div className={styles.priceCellContent}>
                <input type="text" value={item.article_no} readOnly />
              </div>
            </td>
            <td>
              <div className={styles.priceCellContent}>
                <input type="text" value={item.name} readOnly />
              </div>
            </td>
            <td><input type="text" value={item.in_price || ''} readOnly /></td>
            <td><input type="text" value={item.price} readOnly /></td>
            <td><input type="text" value={item.unit || ''} readOnly /></td>
            <td><input type="text" value={item.in_stock || ''} readOnly /></td>
            <td><input type="text" value={item.description || ''} readOnly /></td>
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
                  placeholder={t.searchProduct}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <span className={styles.priceSearchIcon}>🔍</span>
              </div>
            </div>
            <div className={styles.priceActionButtons}>
              <button
                className={`${styles.priceIconBtn} ${styles.newProduct}`}
                onClick={() => {
                  setFormData({ id: null, article_no: '', name: '', in_price: '', price: '', unit: '', in_stock: '', description: '' });
                  setIsFormOpen(true);
                  setError(null);
                  setSuccess(null);
                }}
              >
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

          {isFormOpen && (
            <div className={styles.priceFormContainer}>
              <h3>{formData.id ? t.editProduct : t.newProduct}</h3>
              <div className={styles.priceForm}>
                <div className={styles.formGroup}>
                  <label>{t.articleNo}</label>
                  <input
                    type="text"
                    name="article_no"
                    value={formData.article_no}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.inPrice}</label>
                  <input
                    type="number"
                    name="in_price"
                    value={formData.in_price}
                    onChange={handleFormChange}
                    step="0.01"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.price}</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                    step="0.01"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.unit}</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleFormChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.inStock}</label>
                  <input
                    type="number"
                    name="in_stock"
                    value={formData.in_stock}
                    onChange={handleFormChange}
                    step="1"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{t.description}</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className={styles.formActions}>
                  <button onClick={handleCreateOrUpdate}>{t.saveProduct}</button>
                  <button onClick={() => setIsFormOpen(false)}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

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