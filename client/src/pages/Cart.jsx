import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) return (
    <div style={{ paddingTop: '9rem', textAlign: 'center', minHeight: '60vh' }}>
      <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, marginBottom: '0.75rem' }}>Your cart is empty</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Discover beautiful canvas art to fill your space.</p>
      <Link to="/products" className="btn btn-gold">Start Shopping</Link>
    </div>
  );

  const shipping = cartTotal >= 10000 ? 0 : 500;

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <p className="section-subtitle">Review</p>
          <h1 className="section-title">Your <em>Cart</em></h1>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.key} className="cart-item">
                <div className="cart-item__img">
                  <img src={item.image || '/assets/placeholder.jpg'} alt={item.name} />
                </div>
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.name}</h3>
                  {item.size && <p className="cart-item__size">Size: {item.size}</p>}
                  <p className="cart-item__price">Rs. {item.price?.toLocaleString()}</p>
                </div>
                <div className="cart-item__qty">
                  <button onClick={() => updateQty(item.key, item.qty - 1)}><FiMinus size={13} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.key, item.qty + 1)}><FiPlus size={13} /></button>
                </div>
                <p className="cart-item__subtotal">Rs. {(item.price * item.qty).toLocaleString()}</p>
                <button className="cart-item__remove" onClick={() => removeFromCart(item.key)}><FiTrash2 size={16} /></button>
              </div>
            ))}
            <button className="btn-ghost" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }} onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>
            <div className="cart-summary__row"><span>Subtotal</span><span>Rs. {cartTotal.toLocaleString()}</span></div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: 'var(--gold)' }}>Free</span> : `Rs. ${shipping}`}</span>
            </div>
            <div className="gold-line" />
            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>Rs. {(cartTotal + shipping).toLocaleString()}</span>
            </div>
            {cartTotal < 10000 && (
              <p className="cart-summary__note">Add Rs. {(10000 - cartTotal).toLocaleString()} more for free shipping</p>
            )}
            <Link to="/checkout" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}>
              Proceed to Checkout <FiArrowRight />
            </Link>
            <Link to="/products" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cart-layout{display:grid;grid-template-columns:1fr 340px;gap:2.5rem;align-items:start;}
        .cart-items{display:flex;flex-direction:column;gap:1rem;}
        .cart-item{display:grid;grid-template-columns:90px 1fr auto auto auto;gap:1.25rem;align-items:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem 1.25rem;}
        .cart-item__img{width:90px;height:70px;border-radius:var(--radius-sm);overflow:hidden;}
        .cart-item__img img{width:100%;height:100%;object-fit:cover;}
        .cart-item__name{font-family:var(--font-display);font-size:1rem;margin-bottom:0.2rem;}
        .cart-item__size{font-size:0.75rem;color:var(--text-muted);}
        .cart-item__price{font-size:0.85rem;color:var(--gold);margin-top:0.3rem;}
        .cart-item__qty{display:flex;align-items:center;gap:0.5rem;border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.3rem 0.5rem;}
        .cart-item__qty button{color:var(--text-muted);cursor:pointer;transition:color 0.2s;}
        .cart-item__qty button:hover{color:var(--gold);}
        .cart-item__qty span{min-width:24px;text-align:center;font-size:0.9rem;}
        .cart-item__subtotal{font-weight:500;color:var(--text-primary);font-size:0.95rem;}
        .cart-item__remove{color:var(--text-muted);transition:color 0.2s;cursor:pointer;}
        .cart-item__remove:hover{color:#e55;}
        .cart-summary{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.75rem;position:sticky;top:7rem;}
        .cart-summary__title{font-family:var(--font-display);font-size:1.4rem;margin-bottom:1.25rem;}
        .cart-summary__row{display:flex;justify-content:space-between;font-size:0.88rem;color:var(--text-secondary);margin-bottom:0.75rem;}
        .cart-summary__total{font-size:1.05rem;font-weight:600;color:var(--text-primary);margin-top:0.5rem;}
        .cart-summary__note{font-size:0.75rem;color:var(--gold);margin-top:0.5rem;text-align:center;}
        @media(max-width:900px){.cart-layout{grid-template-columns:1fr;}}
        @media(max-width:600px){.cart-item{grid-template-columns:70px 1fr;grid-template-rows:auto auto auto;}.cart-item__qty,.cart-item__subtotal,.cart-item__remove{grid-column:2;}}
      `}</style>
    </div>
  );
}
