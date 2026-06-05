import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/productService';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiChevronLeft, FiCheck, FiZoomIn } from 'react-icons/fi';


export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then(({ data }) => {
        setProduct(data.product);
        setSelectedSize(data.product.sizes?.[0] || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, qty);
    window.location.href = '/cart';
  };

  if (loading) return <div className="spinner" style={{ marginTop: '8rem' }} />;
  if (!product) return (
    <div style={{ textAlign: 'center', paddingTop: '8rem', color: 'var(--text-muted)' }}>
      <p>Product not found.</p>
      <Link to="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>Back to Shop</Link>
    </div>
  );

  const images = product.images?.length > 0 ? product.images : [{ url: '/assets/placeholder.jpg', alt: product.name }];
  const price = selectedSize?.price || product.price;

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <Link to="/products" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
          <FiChevronLeft /> Back to Products
        </Link>

        <div className="pd-layout">
          {/* ── Gallery ── */}
          <div className="pd-gallery">
            <div className={`pd-gallery__main${zoomed ? ' zoomed' : ''}`} onClick={() => setZoomed(z => !z)}>
              <img src={images[activeImg].url} alt={images[activeImg].alt || product.name} />
              <button className="pd-zoom-hint"><FiZoomIn /></button>
            </div>
            {images.length > 1 && (
              <div className="pd-gallery__thumbs">
                {images.map((img, i) => (
                  <button key={i} className={`pd-gallery__thumb${i === activeImg ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={img.url} alt={img.alt} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="pd-info">
            <p className="section-subtitle">{product.category}</p>
            <h1 className="pd-info__title">{product.name}</h1>
            <p className="pd-info__type">{product.pieceType}</p>
            <div className="gold-line" style={{ margin: '1rem 0', marginLeft: 0 }} />

            <p className="pd-info__price">Rs. {price?.toLocaleString()}</p>
            {product.description && <p className="pd-info__desc">{product.description}</p>}

            {/* Sizes — pill style */}
            {product.sizes?.length > 0 && (
              <div className="pd-sizes">
                <p className="pd-section-label">Size</p>
                <div className="pd-sizes__grid">
                  {product.sizes.map((s, i) => (
                    <button
                      key={i}
                      className={`pd-size-pill${selectedSize?.label === s.label ? ' active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s.label}{s.dimensions ? ` · ${s.dimensions}` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="pd-qty">
              <p className="pd-section-label">Quantity</p>
              <div className="pd-qty__ctrl">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pd-cta-stack">
              <button className={`btn pd-add-btn${added ? ' added' : ''}`} onClick={handleAddToCart}>
                {added ? <><FiCheck /> Added to Cart!</> : <><FiShoppingBag /> Add to Cart</>}
              </button>
              <button className="btn pd-buy-btn" onClick={handleBuyNow}>
                Buy it now
              </button>

            </div>

            {/* Meta */}
            <div className="pd-meta">
              {product.colors?.length > 0 && (
                <div className="pd-meta__item"><span>Colors:</span><p>{product.colors.join(', ')}</p></div>
              )}
              <div className="pd-meta__item">
                <span>Stock:</span>
                <p style={{ color: product.stock > 0 ? '#4caf6e' : '#e55' }}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </p>
              </div>
              <div className="pd-meta__item"><span>Type:</span><p>{product.pieceType}</p></div>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        /* ── Layout ── */
        .pd-layout{display:grid;grid-template-columns:42% 1fr;gap:3rem;align-items:start;}

        /* ── Gallery ── */
        .pd-gallery__main{
          position:relative;
          background:var(--bg-card);
          border:1px solid var(--border);
          border-radius:var(--radius-lg);
          overflow:hidden;
          width:100%;
          cursor:zoom-in;
          transition:var(--transition);
        }
        .pd-gallery__main.zoomed{cursor:zoom-out;}
        .pd-gallery__main img{width:100%;height:auto;display:block;object-fit:contain;transition:transform 0.4s ease;}
        .pd-gallery__main.zoomed img{transform:scale(1.5);}
        .pd-zoom-hint{
          position:absolute;bottom:0.75rem;right:0.75rem;
          background:rgba(0,0,0,0.6);color:#fff;border:none;
          border-radius:50%;width:34px;height:34px;
          display:flex;align-items:center;justify-content:center;
          backdrop-filter:blur(4px);pointer-events:none;
        }
        .pd-gallery__thumbs{display:flex;gap:0.75rem;}
        .pd-gallery__thumb{width:80px;height:80px;border:2px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;transition:var(--transition);flex-shrink:0;}
        .pd-gallery__thumb.active{border-color:var(--gold);}
        .pd-gallery__thumb img{width:100%;height:100%;object-fit:cover;}

        /* ── Info text ── */
        .pd-info__title{font-family:var(--font-display);font-size:clamp(2rem,3vw,3rem);font-weight:300;margin:0.25rem 0;line-height:1.1;}
        .pd-info__type{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);}
        .pd-info__price{font-family:var(--font-display);font-size:1.8rem;color:var(--gold);font-weight:300;margin:0.5rem 0 0.5rem;}
        .pd-info__desc{font-size:0.9rem;color:var(--text-secondary);line-height:1.8;margin-bottom:1.5rem;}
        .pd-section-label{font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.6rem;}

        /* ── Size pills ── */
        .pd-sizes{margin-bottom:1.5rem;}
        .pd-sizes__grid{display:flex;gap:0.5rem;flex-wrap:wrap;}
        .pd-size-pill{
          padding:0.5rem 1.1rem;
          border:1px solid var(--border);
          border-radius:999px;
          font-size:0.82rem;
          color:var(--text-secondary);
          background:var(--bg-card);
          cursor:pointer;
          transition:var(--transition);
          font-family:var(--font-body);
        }
        .pd-size-pill:hover{
          border-color:var(--gold);
          color:var(--gold);
        }
        .pd-size-pill.active{
          border-color:var(--gold);
          background:var(--gold);
          color:#0d0c0a;
          font-weight:600;
        }

        /* ── Quantity ── */
        .pd-qty{margin-bottom:1.5rem;}
        .pd-qty__ctrl{display:inline-flex;align-items:center;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;}
        .pd-qty__ctrl button{width:40px;height:40px;font-size:1.2rem;color:var(--text-secondary);background:var(--bg-card);cursor:pointer;transition:var(--transition);border:none;}
        .pd-qty__ctrl button:hover{color:var(--gold);}
        .pd-qty__ctrl span{width:48px;text-align:center;font-size:0.95rem;color:var(--text-primary);}

        /* ── CTA stack ── */
        .pd-cta-stack{display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem;}
        .pd-add-btn{
          width:100%;justify-content:center;padding:0.9rem;
          background:var(--gold);color:#0d0c0a;
          border:none;border-radius:var(--radius-sm);
          font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;
          font-weight:600;font-family:var(--font-body);cursor:pointer;
          transition:var(--transition);display:flex;align-items:center;gap:0.5rem;
        }
        .pd-add-btn:hover{background:var(--gold-light);}
        .pd-add-btn.added{background:linear-gradient(135deg,#3a7d44,#2d6235);color:#fff;}
        .pd-buy-btn{
          width:100%;justify-content:center;padding:0.9rem;
          background:#1a1814;color:var(--text-primary);
          border:1px solid var(--border);border-radius:var(--radius-sm);
          font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;
          font-family:var(--font-body);cursor:pointer;
          transition:var(--transition);display:flex;align-items:center;gap:0.5rem;
        }
        .pd-buy-btn:hover{border-color:var(--gold);color:var(--gold);}

        /* ── Meta ── */
        .pd-meta{border-top:1px solid var(--border);padding-top:1.25rem;display:flex;flex-direction:column;gap:0.6rem;}
        .pd-meta__item{display:flex;gap:0.75rem;font-size:0.84rem;}
        .pd-meta__item span{color:var(--text-muted);min-width:70px;}
        .pd-meta__item p{color:var(--text-secondary);}

        @media(max-width:900px){.pd-layout{grid-template-columns:1fr;gap:2rem;}}
      `}</style>
    </div>
  );
}
