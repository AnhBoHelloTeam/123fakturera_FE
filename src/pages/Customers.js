import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/styles.css';

function Customers({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    postNumber: '',
    city: '',
    country: 'Sweden',
    orgNumber: '',
    vatNumber: '',
    paymentTerms: '30 days',
    currency: 'SEK',
    notes: '',
  });

  const textLabels = {
    sv: {
      title: 'Kundregister',
      newCustomer: 'Ny Kund',
      customerNumber: 'Kundnummer',
      companyName: 'Företagsnamn',
      contactPerson: 'Kontaktperson',
      email: 'E-post',
      phone: 'Telefon',
      address: 'Adress',
      city: 'Stad',
      country: 'Land',
      orgNumber: 'Organisationsnummer',
      vatNumber: 'Momsregistreringsnummer',
      paymentTerms: 'Betalningsvillkor',
      currency: 'Valuta',
      notes: 'Anteckningar',
      status: 'Status',
      active: 'Aktiv',
      inactive: 'Inaktiv',
      actions: 'Åtgärder',
      edit: 'Redigera',
      delete: 'Ta bort',
      toggleStatus: 'Växla Status',
      createCustomer: 'Skapa Kund',
      editCustomer: 'Redigera Kund',
      cancel: 'Avbryt',
      save: 'Spara',
      noCustomers: 'Inga kunder hittades',
      loading: 'Laddar...',
      error: 'Ett fel uppstod',
      searchPlaceholder: 'Sök kunder...',
      confirmDelete: 'Är du säker på att du vill ta bort denna kund?',
    },
    en: {
      title: 'Customer Register',
      newCustomer: 'New Customer',
      customerNumber: 'Customer Number',
      companyName: 'Company Name',
      contactPerson: 'Contact Person',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      country: 'Country',
      orgNumber: 'Organization Number',
      vatNumber: 'VAT Number',
      paymentTerms: 'Payment Terms',
      currency: 'Currency',
      notes: 'Notes',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      toggleStatus: 'Toggle Status',
      createCustomer: 'Create Customer',
      editCustomer: 'Edit Customer',
      cancel: 'Cancel',
      save: 'Save',
      noCustomers: 'No customers found',
      loading: 'Loading...',
      error: 'An error occurred',
      searchPlaceholder: 'Search customers...',
      confirmDelete: 'Are you sure you want to delete this customer?',
    },
  };

  const t = textLabels[language] || textLabels.en;

  const sidebarLinks = [
    { text: 'Invoices', icon: '📄', path: '/invoices' },
    { text: t.title, icon: '👥', path: '/customers', active: true },
    { text: 'My Business', icon: '🏢', path: '/mybusiness' },
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
  ];

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        search: searchTerm,
      });
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, newCustomer, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setShowCreateModal(false);
      setNewCustomer({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        address2: '',
        postNumber: '',
        city: '',
        country: 'Sweden',
        orgNumber: '',
        vatNumber: '',
        paymentTerms: '30 days',
        currency: 'SEK',
        notes: '',
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
      setError(t.error);
    }
  };

  const handleEditCustomer = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/customers/${editingCustomer.id}`, editingCustomer, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setShowEditModal(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      setError(t.error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm(t.confirmDelete)) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError(t.error);
    }
  };

  const handleToggleStatus = async (customerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/customers/${customerId}/toggle-status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch (error) {
      console.error('Error toggling customer status:', error);
      setError(t.error);
    }
  };

  const openEditModal = (customer) => {
    setEditingCustomer({ ...customer });
    setShowEditModal(true);
  };

  return (
    <div className="app-container">
      <HamburgerMenu language={language} />
      
      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>123 Fakturera</h2>
          </div>
          <nav className="sidebar-nav">
            {sidebarLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className={`sidebar-link ${link.active ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
              >
                <span className="sidebar-icon">{link.icon}</span>
                <span className="sidebar-text">{link.text}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="content">
          <div className="page-header">
            <h1>{t.title}</h1>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              {t.newCustomer}
            </button>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>

          {loading ? (
            <div className="loading">{t.loading}</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : customers.length === 0 ? (
            <div className="no-data">{t.noCustomers}</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.customerNumber}</th>
                    <th>{t.companyName}</th>
                    <th>{t.contactPerson}</th>
                    <th>{t.email}</th>
                    <th>{t.phone}</th>
                    <th>{t.city}</th>
                    <th>{t.status}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.customerNumber}</td>
                      <td>{customer.companyName}</td>
                      <td>{customer.contactPerson}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.city}</td>
                      <td>
                        <span 
                          className={`status-badge ${customer.isActive ? 'active' : 'inactive'}`}
                        >
                          {customer.isActive ? t.active : t.inactive}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => openEditModal(customer)}
                          >
                            {t.edit}
                          </button>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleToggleStatus(customer.id)}
                          >
                            {t.toggleStatus}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteCustomer(customer.id)}
                          >
                            {t.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="btn btn-sm"
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Customer Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t.createCustomer}</h2>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t.companyName}</label>
                <input
                  type="text"
                  value={newCustomer.companyName}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder={t.companyName}
                />
              </div>

              <div className="form-group">
                <label>{t.contactPerson}</label>
                <input
                  type="text"
                  value={newCustomer.contactPerson}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder={t.contactPerson}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={t.email}
                  />
                </div>
                <div className="form-group">
                  <label>{t.phone}</label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder={t.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.address}</label>
                <input
                  type="text"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, address: e.target.value }))}
                  placeholder={t.address}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.postNumber}</label>
                  <input
                    type="text"
                    value={newCustomer.postNumber}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, postNumber: e.target.value }))}
                    placeholder={t.postNumber}
                  />
                </div>
                <div className="form-group">
                  <label>{t.city}</label>
                  <input
                    type="text"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, city: e.target.value }))}
                    placeholder={t.city}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.orgNumber}</label>
                  <input
                    type="text"
                    value={newCustomer.orgNumber}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, orgNumber: e.target.value }))}
                    placeholder={t.orgNumber}
                  />
                </div>
                <div className="form-group">
                  <label>{t.vatNumber}</label>
                  <input
                    type="text"
                    value={newCustomer.vatNumber}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, vatNumber: e.target.value }))}
                    placeholder={t.vatNumber}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.notes}</label>
                <textarea
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  placeholder={t.notes}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                {t.cancel}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateCustomer}
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && editingCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t.editCustomer}</h2>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t.companyName}</label>
                <input
                  type="text"
                  value={editingCustomer.companyName}
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder={t.companyName}
                />
              </div>

              <div className="form-group">
                <label>{t.contactPerson}</label>
                <input
                  type="text"
                  value={editingCustomer.contactPerson}
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder={t.contactPerson}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={t.email}
                  />
                </div>
                <div className="form-group">
                  <label>{t.phone}</label>
                  <input
                    type="tel"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder={t.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.address}</label>
                <input
                  type="text"
                  value={editingCustomer.address}
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, address: e.target.value }))}
                  placeholder={t.address}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.postNumber}</label>
                  <input
                    type="text"
                    value={editingCustomer.postNumber}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, postNumber: e.target.value }))}
                    placeholder={t.postNumber}
                  />
                </div>
                <div className="form-group">
                  <label>{t.city}</label>
                  <input
                    type="text"
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, city: e.target.value }))}
                    placeholder={t.city}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.orgNumber}</label>
                  <input
                    type="text"
                    value={editingCustomer.orgNumber}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, orgNumber: e.target.value }))}
                    placeholder={t.orgNumber}
                  />
                </div>
                <div className="form-group">
                  <label>{t.vatNumber}</label>
                  <input
                    type="text"
                    value={editingCustomer.vatNumber}
                    onChange={(e) => setEditingCustomer(prev => ({ ...prev, vatNumber: e.target.value }))}
                    placeholder={t.vatNumber}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.notes}</label>
                <textarea
                  value={editingCustomer.notes}
                  onChange={(e) => setEditingCustomer(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
                  placeholder={t.notes}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                {t.cancel}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleEditCustomer}
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;
