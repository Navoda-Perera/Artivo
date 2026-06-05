import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/orderService';
import { FiPackage, FiUser, FiClock, FiCheck, FiTruck } from 'react-icons/fi';

const STATUS_ICON = { Pending: <FiClock />, Processing: <FiPackage />, Shipped: <FiTruck />, Delivered: <FiCheck />, Cancelled: '✕' };
const STATUS_COLOR = { Pending: '#c9a84c', Processing: '#5b8dd9', Shipped: '#9b59b6', Delivered: '#27ae60', Cancelled: '#e74c3c' };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data.orders || []))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const name = user?.user?.name || 'Customer';
  const email = user?.user?.email || '';

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <p className="section-subtitle">My Account</p>
          <h1 className="section-title">Welcome, <em>{name.split(' ')[0]}</em></h1>
        </div>

        <div className="dash-layout">
          {/* Sidebar */}
          <aside className="dash-sidebar">
            <div className="dash-avatar">
              <div className="dash-avatar__circle">{name[0]?.toUpperCase()}</div>
              <div>
                <p className="dash-avatar__name">{name}</p>
                <p className="dash-avatar__email">{email}</p>
              </div>
            </div>
            <nav className="dash-nav">
              <button className={`dash-nav__btn${activeTab === 'orders' ? ' active' : ''}`} onClick={() => setActiveTab('orders')}>
                <FiPackage /> My Orders
              </button>
              <button className={`dash-nav__btn${activeTab === 'profile' ? ' active' : ''}`} onClick={() => setActiveTab('profile')}>
                <FiUser /> Profile
              </button>
              <button className="dash-nav__btn dash-nav__btn--logout" onClick={logout}>
                Logout
              </button>
            </nav>
          </aside>

          {/* Main */}
          <div className="dash-main">
            {activeTab === 'orders' && (
              <div>
                <h2 className="dash-section-title">Order History</h2>
                {loading ? <div className="spinner" /> :
                  orders.length === 0 ? (
                    <div className="dash-empty">
                      <FiPackage size={48} />
                      <p>No orders yet.</p>
                      <a href="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>Start Shopping</a>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map(order => (
                        <div key={order._id} className="order-card">
                          <div className="order-card__header">
                            <div>
                              <p className="order-card__id">#{order._id.slice(-8).toUpperCase()}</p>
                              <p className="order-card__date">{new Date(order.createdAt).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <span className="order-card__status" style={{ color: STATUS_COLOR[order.status] }}>
                              {STATUS_ICON[order.status]} {order.status}
                            </span>
                          </div>
                          <div className="order-card__items">
                            {order.orderItems.map((item, i) => (
                              <div key={i} className="order-card__item">
                                <img src={item.image || '/assets/placeholder.jpg'} alt={item.name} />
                                <div>
                                  <p>{item.name}</p>
                                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Qty: {item.quantity} {item.size && `· ${item.size}`}</p>
                                </div>
                                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-card__footer">
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{order.paymentMethod}</span>
                            <span className="order-card__total">Total: Rs. {order.totalPrice?.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="dash-section-title">Profile Details</h2>
                <div className="profile-card">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" defaultValue={name} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" defaultValue={email} readOnly />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Profile editing coming soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dash-layout{display:grid;grid-template-columns:260px 1fr;gap:2rem;align-items:start;}
        .dash-sidebar{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.5rem;position:sticky;top:7rem;}
        .dash-avatar{display:flex;align-items:center;gap:1rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border);margin-bottom:1.25rem;}
        .dash-avatar__circle{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dark));display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:600;color:#0d0c0a;flex-shrink:0;}
        .dash-avatar__name{font-weight:500;font-size:0.9rem;color:var(--text-primary);}
        .dash-avatar__email{font-size:0.75rem;color:var(--text-muted);}
        .dash-nav{display:flex;flex-direction:column;gap:0.25rem;}
        .dash-nav__btn{display:flex;align-items:center;gap:0.75rem;padding:0.65rem 0.75rem;font-size:0.83rem;letter-spacing:0.06em;color:var(--text-secondary);border-radius:var(--radius-sm);transition:var(--transition);text-align:left;font-family:var(--font-body);cursor:pointer;}
        .dash-nav__btn:hover,.dash-nav__btn.active{color:var(--gold);background:rgba(201,168,76,0.08);}
        .dash-nav__btn--logout{color:var(--text-muted);margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem;}
        .dash-nav__btn--logout:hover{color:#e55;}
        .dash-main{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:2rem;}
        .dash-section-title{font-family:var(--font-display);font-size:1.5rem;font-weight:300;margin-bottom:1.5rem;}
        .dash-empty{display:flex;flex-direction:column;align-items:center;padding:3rem;color:var(--text-muted);gap:0.75rem;}
        .orders-list{display:flex;flex-direction:column;gap:1.25rem;}
        .order-card{border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;}
        .order-card__header{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:var(--bg-surface);border-bottom:1px solid var(--border);}
        .order-card__id{font-weight:600;font-size:0.9rem;color:var(--text-primary);}
        .order-card__date{font-size:0.76rem;color:var(--text-muted);margin-top:0.2rem;}
        .order-card__status{display:flex;align-items:center;gap:0.4rem;font-size:0.8rem;font-weight:500;letter-spacing:0.06em;}
        .order-card__items{padding:1rem 1.25rem;display:flex;flex-direction:column;gap:0.75rem;}
        .order-card__item{display:flex;align-items:center;gap:1rem;font-size:0.85rem;color:var(--text-secondary);}
        .order-card__item img{width:48px;height:40px;object-fit:cover;border-radius:4px;flex-shrink:0;}
        .order-card__item div{flex:1;}
        .order-card__item span{color:var(--gold);font-weight:500;white-space:nowrap;}
        .order-card__footer{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1.25rem;border-top:1px solid var(--border);}
        .order-card__total{font-weight:600;font-size:0.9rem;color:var(--text-primary);}
        .profile-card{max-width:480px;}
        @media(max-width:768px){.dash-layout{grid-template-columns:1fr;}.dash-sidebar{position:static;}}
      `}</style>
    </div>
  );
}
