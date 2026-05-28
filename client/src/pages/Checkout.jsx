import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = cartTotal >= 10000 ? 0 : 500;

  const [form, setForm] = useState({ fullName: '', address: '', city: '', postalCode: '', country: 'Sri Lanka', phone: '', paymentMethod: 'Cash on Delivery' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error('Your cart is empty');
    setLoading(true);
    try {
      const { data } = await createOrder({
        orderItems: cartItems.map(i => ({ product: i._id, name: i.name, image: i.image, price: i.price, quantity: i.qty, size: i.size })),
        shippingAddress: { fullName: form.fullName, address: form.address, city: form.city, postalCode: form.postalCode, country: form.country, phone: form.phone },
        paymentMethod: form.paymentMethod,
        subtotal: cartTotal,
        shippingPrice: shipping,
        totalPrice: cartTotal + shipping,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <p className="section-subtitle">Almost There</p>
          <h1 className="section-title">Checkout</h1>
        </div>

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h3 className="checkout-section-title">Shipping Information</h3>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required placeholder="+94 XX XXX XXXX" />
            </div>
            <div className="form-group">
              <label className="form-label">Address *</label>
              <input className="form-input" name="address" value={form.address} onChange={handleChange} required placeholder="Street address" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">City *</label>
                <input className="form-input" name="city" value={form.city} onChange={handleChange} required placeholder="Colombo" />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input className="form-input" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="10100" />
              </div>
            </div>

            <h3 className="checkout-section-title" style={{ marginTop: '2rem' }}>Payment Method</h3>
            <div className="payment-options">
              {['Cash on Delivery', 'Bank Transfer'].map(method => (
                <label key={method} className={`payment-option${form.paymentMethod === method ? ' active' : ''}`}>
                  <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} />
                  <span>{method}</span>
                </label>
              ))}
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }} disabled={loading}>
              {loading ? 'Placing Order…' : 'Place Order'}
            </button>
          </form>

          {/* Order summary */}
          <div className="cart-summary" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.75rem', position: 'sticky', top: '7rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '1.25rem' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {cartItems.map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span>{item.name} × {item.qty}</span>
                  <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="gold-line" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.75rem' }}>
              <span>Total</span><span style={{ color: 'var(--gold)' }}>Rs. {(cartTotal + shipping).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-layout{display:grid;grid-template-columns:1fr 340px;gap:2.5rem;align-items:start;}
        .checkout-form{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:2rem;}
        .checkout-section-title{font-family:var(--font-display);font-size:1.3rem;font-weight:300;margin-bottom:1.25rem;color:var(--text-primary);}
        .payment-options{display:flex;flex-direction:column;gap:0.75rem;}
        .payment-option{display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1rem;border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);font-size:0.88rem;color:var(--text-secondary);}
        .payment-option.active{border-color:var(--gold);color:var(--text-primary);background:rgba(201,168,76,0.06);}
        .payment-option input{accent-color:var(--gold);}
        @media(max-width:900px){.checkout-layout{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}
