import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/styles.css';

function Invoices({ language, setLanguage, headerLinks }) {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    customerId: '',
    search: '',
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customerId: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    notes: '',
    paymentTerms: '30 days',
    taxRate: 25,
  });

  const textLabels = {
    sv: {
      title: 'Fakturor',
      newInvoice: 'Ny Faktura',
      invoiceNumber: 'Fakturanummer',
      customer: 'Kund',
      date: 'Datum',
      dueDate: 'Förfallodatum',
      status: 'Status',
      total: 'Totalt',
      actions: 'Åtgärder',
      draft: 'Utkast',
      sent: 'Skickad',
      paid: 'Betalad',
      overdue: 'Förfallen',
      cancelled: 'Avbruten',
      send: 'Skicka',
      markPaid: 'Markera som betald',
      edit: 'Redigera',
      delete: 'Ta bort',
      createInvoice: 'Skapa Faktura',
      cancel: 'Avbryt',
      save: 'Spara',
      addItem: 'Lägg till rad',
      removeItem: 'Ta bort rad',
      description: 'Beskrivning',
      quantity: 'Antal',
      unitPrice: 'Enhetspris',
      subtotal: 'Delsumma',
      tax: 'Moms',
      totalAmount: 'Totalsumma',
      notes: 'Anteckningar',
      paymentTerms: 'Betalningsvillkor',
      taxRate: 'Momsprocent',
      noInvoices: 'Inga fakturor hittades',
      loading: 'Laddar...',
      error: 'Ett fel uppstod',
    },
    en: {
      title: 'Invoices',
      newInvoice: 'New Invoice',
      invoiceNumber: 'Invoice Number',
      customer: 'Customer',
      date: 'Date',
      dueDate: 'Due Date',
      status: 'Status',
      total: 'Total',
      actions: 'Actions',
      draft: 'Draft',
      sent: 'Sent',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled',
      send: 'Send',
      markPaid: 'Mark as Paid',
      edit: 'Edit',
      delete: 'Delete',
      createInvoice: 'Create Invoice',
      cancel: 'Cancel',
      save: 'Save',
      addItem: 'Add Item',
      removeItem: 'Remove Item',
      description: 'Description',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      subtotal: 'Subtotal',
      tax: 'Tax',
      totalAmount: 'Total Amount',
      notes: 'Notes',
      paymentTerms: 'Payment Terms',
      taxRate: 'Tax Rate',
      noInvoices: 'No invoices found',
      loading: 'Loading...',
      error: 'An error occurred',
    },
  };

  const t = textLabels[language] || textLabels.en;

  const sidebarLinks = [
    { text: t.title, icon: '📄', path: '/invoices', active: true },
    { text: 'Customer register', icon: '👥', path: '/customers' },
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
    fetchInvoices();
    fetchCustomers();
  }, [currentPage, filters]);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...filters,
      });
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoices?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setInvoices(response.data.invoices);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/invoices`, newInvoice, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setShowCreateModal(false);
      setNewInvoice({
        customerId: '',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, unitPrice: 0 }],
        notes: '',
        paymentTerms: '30 days',
        taxRate: 25,
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error);
      setError(t.error);
    }
  };

  const handleSendInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/invoices/${invoiceId}/send`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error sending invoice:', error);
      setError(t.error);
    }
  };

  const handleMarkPaid = async (invoiceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/invoices/${invoiceId}/paid`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      setError(t.error);
    }
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/invoices/${invoiceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      setError(t.error);
    }
  };

  const addInvoiceItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  const removeInvoiceItem = (index) => {
    if (newInvoice.items.length > 1) {
      setNewInvoice(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
  };

  const updateInvoiceItem = (index, field, value) => {
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: '#6c757d',
      sent: '#007bff',
      paid: '#28a745',
      overdue: '#dc3545',
      cancelled: '#6c757d',
    };
    return colors[status] || '#6c757d';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
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
              {t.newInvoice}
            </button>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search invoices..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="filter-input"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="draft">{t.draft}</option>
              <option value="sent">{t.sent}</option>
              <option value="paid">{t.paid}</option>
              <option value="overdue">{t.overdue}</option>
              <option value="cancelled">{t.cancelled}</option>
            </select>
            <select
              value={filters.customerId}
              onChange={(e) => setFilters(prev => ({ ...prev, customerId: e.target.value }))}
              className="filter-select"
            >
              <option value="">All Customers</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.companyName || customer.contactPerson}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="loading">{t.loading}</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : invoices.length === 0 ? (
            <div className="no-data">{t.noInvoices}</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.invoiceNumber}</th>
                    <th>{t.customer}</th>
                    <th>{t.date}</th>
                    <th>{t.dueDate}</th>
                    <th>{t.status}</th>
                    <th>{t.total}</th>
                    <th>{t.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.invoiceNumber}</td>
                      <td>{invoice.customer?.companyName || invoice.customer?.contactPerson}</td>
                      <td>{formatDate(invoice.invoiceDate)}</td>
                      <td>{formatDate(invoice.dueDate)}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(invoice.status) }}
                        >
                          {t[invoice.status]}
                        </span>
                      </td>
                      <td>{formatCurrency(invoice.total)}</td>
                      <td>
                        <div className="action-buttons">
                          {invoice.status === 'draft' && (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleSendInvoice(invoice.id)}
                            >
                              {t.send}
                            </button>
                          )}
                          {invoice.status === 'sent' && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleMarkPaid(invoice.id)}
                            >
                              {t.markPaid}
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
                          >
                            {t.edit}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteInvoice(invoice.id)}
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

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{t.createInvoice}</h2>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>{t.customer}</label>
                <select
                  value={newInvoice.customerId}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, customerId: e.target.value }))}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.companyName || customer.contactPerson}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.date}</label>
                  <input
                    type="date"
                    value={newInvoice.invoiceDate}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, invoiceDate: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>{t.dueDate}</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="invoice-items">
                <h3>Invoice Items</h3>
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="invoice-item">
                    <input
                      type="text"
                      placeholder={t.description}
                      value={item.description}
                      onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                      className="item-description"
                    />
                    <input
                      type="number"
                      placeholder={t.quantity}
                      value={item.quantity}
                      onChange={(e) => updateInvoiceItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="item-quantity"
                    />
                    <input
                      type="number"
                      placeholder={t.unitPrice}
                      value={item.unitPrice}
                      onChange={(e) => updateInvoiceItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="item-price"
                    />
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeInvoiceItem(index)}
                      disabled={newInvoice.items.length === 1}
                    >
                      {t.removeItem}
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={addInvoiceItem}
                >
                  {t.addItem}
                </button>
              </div>

              <div className="form-group">
                <label>{t.notes}</label>
                <textarea
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, notes: e.target.value }))}
                  rows="3"
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
                onClick={handleCreateInvoice}
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

export default Invoices;
