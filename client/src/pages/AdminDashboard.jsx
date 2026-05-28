import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { getAllOrders, updateOrderStatus } from '../services/orderService';
import { getMessages, updateMessageStatus, deleteMessage } from '../services/messageService';
import toast from 'react-hot-toast';
import { FiTrash2, FiPlus, FiPackage, FiShoppingBag, FiUsers, FiMessageSquare, FiEdit2 } from 'react-icons/fi';

const BLANK = { name: '', description: '', price: '', category: 'Modern', pieceType: 'Single Canvas', stock: 10, isFeatured: false, isNewArrival: false, images: [{ url: '', alt: '' }] };
const CATEGORIES = ['Sri Lankan Heritage','Modern','Portraits & Figures','Nautical & Coastal','Horses','Elephants','Abstract','Nature','Cityscape','Floral'];
const PIECE_TYPES = ['Single Canvas','2-Piece Set','3-Piece Triptych','4-Piece Set','5-Piece Set'];
const STATUSES = ['Pending','Processing','Shipped','Delivered','Cancelled'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProducts({ limit: 100 }).then(r => setProducts(r.data.products)),
      getAllOrders().then(r => setOrders(r.data.orders)),
      getMessages().then(r => setMessages(r.data.messages)),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editingId) {
        const { data } = await updateProduct(editingId, payload);
        setProducts(p => p.map(x => x._id === editingId ? data.product : x));
        toast.success('Product updated!');
      } else {
        const { data } = await createProduct(payload);
        setProducts(p => [data.product, ...p]);
        toast.success('Product created!');
      }
      setForm(BLANK);
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setSaving(false); }
  };

  const handleEditClick = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      pieceType: p.pieceType,
      stock: p.stock,
      isFeatured: p.isFeatured || false,
      isNewArrival: p.isNewArrival || false,
      images: p.images?.length > 0 ? p.images : [{ url: '', alt: '' }]
    });
    setEditingId(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(p => p.filter(x => x._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(o => o.map(x => x._id === id ? { ...x, status } : x));
      toast.success('Status updated');
    } catch { toast.error('Update failed'); }
  };

  const handleMessageStatus = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      setMessages(m => m.map(x => x._id === id ? { ...x, status } : x));
      toast.success('Message status updated');
    } catch { toast.error('Update failed'); }
  };

  const handleMessageDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages(m => m.filter(x => x._id !== id));
      toast.success('Message deleted');
    } catch { toast.error('Delete failed'); }
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: <FiShoppingBag /> },
    { label: 'Total Orders', value: orders.length, icon: <FiPackage /> },
    { label: 'Unread Messages', value: messages.filter(m => m.status === 'Unread').length, icon: <FiMessageSquare /> },
  ];

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <p className="section-subtitle">Admin</p>
          <h1 className="section-title">Control <em>Panel</em></h1>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {stats.map(s => (
            <div key={s.label} className="admin-stat-card">
              <div className="admin-stat-card__icon">{s.icon}</div>
              <div>
                <p className="admin-stat-card__val">{s.value}</p>
                <p className="admin-stat-card__label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {['products', 'orders', 'messages'].map(t => (
            <button key={t} className={`admin-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* PRODUCTS TAB */}
        {tab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button className="btn btn-gold" onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setForm(BLANK);
                  setEditingId(null);
                }
              }}>
                <FiPlus /> {showForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleCreate} className="admin-form">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '1.25rem' }}>{editingId ? 'Edit Product' : 'New Product'}</h3>
                <div className="admin-form__grid">
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (Rs.) *</label>
                    <input className="form-input" type="number" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Piece Type</label>
                    <select className="form-input" value={form.pieceType} onChange={e => setForm(f => ({ ...f, pieceType: e.target.value }))}>
                      {PIECE_TYPES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input className="form-input" type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input className="form-input" value={form.images[0]?.url} onChange={e => setForm(f => ({ ...f, images: [{ url: e.target.value, alt: f.name }] }))} placeholder="https://..." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea className="form-input" rows={3} required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} style={{ accentColor: 'var(--gold)' }} />
                    Featured
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isNewArrival} onChange={e => setForm(f => ({ ...f, isNewArrival: e.target.checked }))} style={{ accentColor: 'var(--gold)' }} />
                    New Arrival
                  </label>
                </div>
                <button type="submit" className="btn btn-gold" disabled={saving}>{saving ? 'Saving…' : (editingId ? 'Update Product' : 'Create Product')}</button>
              </form>
            )}

            {loading ? <div className="spinner" /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Name</th><th>Category</th><th>Type</th><th>Price</th><th>Stock</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.category}</td>
                        <td>{p.pieceType}</td>
                        <td>Rs. {p.price?.toLocaleString()}</td>
                        <td>{p.stock}</td>
                        <td>
                          <button className="admin-action-btn" onClick={() => handleEditClick(p)} style={{ marginRight: '0.8rem' }} title="Edit"><FiEdit2 /></button>
                          <button className="admin-action-btn admin-del-btn" onClick={() => handleDelete(p._id)} title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div>
            {loading ? <div className="spinner" /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Method</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id}>
                        <td><code style={{ fontSize: '0.78rem' }}>#{o._id.slice(-8).toUpperCase()}</code></td>
                        <td>{o.user?.name || '—'}<br /><small style={{ color: 'var(--text-muted)' }}>{o.user?.email}</small></td>
                        <td>Rs. {o.totalPrice?.toLocaleString()}</td>
                        <td style={{ fontSize: '0.8rem' }}>{o.paymentMethod}</td>
                        <td>
                          <select
                            className="form-input"
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                            value={o.status}
                            onChange={e => handleStatus(o._id, e.target.value)}
                          >
                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === 'messages' && (
          <div>
            {loading ? <div className="spinner" /> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Date</th><th>Name/Email</th><th>Subject/Message</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {messages.map(m => (
                      <tr key={m._id} style={{ background: m.status === 'Unread' ? 'rgba(201, 168, 76, 0.05)' : 'transparent' }}>
                        <td style={{ whiteSpace: 'nowrap', verticalAlign: 'top' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                        <td style={{ verticalAlign: 'top' }}><strong>{m.name}</strong><br /><small style={{ color: 'var(--text-muted)' }}>{m.email}</small></td>
                        <td><strong>{m.subject}</strong><br /><span style={{ fontSize: '0.8rem', display: 'block', marginTop: '0.3rem', lineHeight: '1.4' }}>{m.message}</span></td>
                        <td style={{ verticalAlign: 'top' }}>
                          <select
                            className="form-input"
                            style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                            value={m.status}
                            onChange={e => handleMessageStatus(m._id, e.target.value)}
                          >
                            <option>Unread</option>
                            <option>Read</option>
                          </select>
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                          <button className="admin-del-btn" onClick={() => handleMessageDelete(m._id)}><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                    {messages.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No messages yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .admin-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:2rem;}
        .admin-stat-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.5rem;display:flex;align-items:center;gap:1.25rem;}
        .admin-stat-card__icon{width:48px;height:48px;background:rgba(201,168,76,0.1);border:1px solid var(--border);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:1.3rem;flex-shrink:0;}
        .admin-stat-card__val{font-family:var(--font-display);font-size:1.6rem;font-weight:300;color:var(--gold);}
        .admin-stat-card__label{font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);}
        .admin-tabs{display:flex;gap:0.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--border);padding-bottom:0;}
        .admin-tab{padding:0.6rem 1.25rem;font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);border-bottom:2px solid transparent;transition:var(--transition);margin-bottom:-1px;font-family:var(--font-body);cursor:pointer;}
        .admin-tab:hover,.admin-tab.active{color:var(--gold);border-bottom-color:var(--gold);}
        .admin-form{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:2rem;margin-bottom:1.5rem;}
        .admin-form__grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .admin-table-wrap{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);overflow:auto;}
        .admin-table{width:100%;border-collapse:collapse;font-size:0.85rem;}
        .admin-table th{background:var(--bg-surface);padding:0.8rem 1rem;text-align:left;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);font-weight:400;border-bottom:1px solid var(--border);}
        .admin-table td{padding:0.8rem 1rem;border-bottom:1px solid var(--border);color:var(--text-secondary);vertical-align:middle;}
        .admin-table tr:last-child td{border-bottom:none;}
        .admin-table tr:hover td{background:rgba(255,255,255,0.02);}
        .admin-action-btn{color:var(--text-muted);cursor:pointer;transition:color 0.2s;background:none;border:none;font-size:1rem;}
        .admin-action-btn:hover{color:var(--gold);}
        .admin-del-btn:hover{color:#e55;}
        @media(max-width:768px){.admin-stats{grid-template-columns:1fr;}.admin-form__grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}
