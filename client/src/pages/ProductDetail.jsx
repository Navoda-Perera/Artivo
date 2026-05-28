import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../services/productService';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiHeart, FiChevronLeft, FiCheck } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

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
          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img src={images[activeImg].url} alt={images[activeImg].alt || product.name} />
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

          {/* Info */}
          <div className="pd-info">
            <p className="section-subtitle">{product.category}</p>
            <h1 className="pd-info__title">{product.name}</h1>
            <p className="pd-info__type">{product.pieceType}</p>
            <div className="gold-line" style={{ margin: '1rem 0', marginLeft: 0 }} />

            <p className="pd-info__price">Rs. {price?.toLocaleString()}</p>
            <p className="pd-info__desc">{product.description}</p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="pd-sizes">
                <p className="pd-section-label">Select Size</p>
                <div className="pd-sizes__grid">
                  {product.sizes.map((s, i) => (
                    <button
                      key={i}
                      className={`pd-size-btn${selectedSize?.label === s.label ? ' active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      <span className="pd-size-btn__label">{s.label}</span>
                      <span className="pd-size-btn__dim">{s.dimensions}</span>
                      <span className="pd-size-btn__price">Rs. {s.price?.toLocaleString()}</span>
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

            {/* CTA */}
            <div className="pd-actions">
              <button className={`btn btn-gold pd-add-btn${added ? ' added' : ''}`} onClick={handleAddToCart}>
                {added ? <><FiCheck /> Added!</> : <><FiShoppingBag /> Add to Cart</>}
              </button>
              <button className="btn btn-outline pd-wish-btn"><FiHeart /></button>
            </div>

            {/* Meta */}
            <div className="pd-meta">
              <div className="pd-meta__item"><span>Colors:</span><p>{product.colors?.join(', ') || '—'}</p></div>
              <div className="pd-meta__item"><span>Stock:</span><p>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pd-layout{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}
        .pd-gallery__main{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:1;margin-bottom:1rem;}
        .pd-gallery__main img{width:100%;height:100%;object-fit:cover;}
        .pd-gallery__thumbs{display:flex;gap:0.75rem;}
        .pd-gallery__thumb{width:70px;height:70px;border:2px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;transition:var(--transition);}
        .pd-gallery__thumb.active{border-color:var(--gold);}
        .pd-gallery__thumb img{width:100%;height:100%;object-fit:cover;}
        .pd-info__title{font-family:var(--font-display);font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;margin:0.25rem 0;}
        .pd-info__type{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);}
        .pd-info__price{font-family:var(--font-display);font-size:2rem;color:var(--gold);font-weight:300;margin:0.5rem 0 1rem;}
        .pd-info__desc{font-size:0.9rem;color:var(--text-secondary);line-height:1.8;margin-bottom:1.5rem;}
        .pd-section-label{font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.6rem;}
        .pd-sizes{margin-bottom:1.5rem;}
        .pd-sizes__grid{display:flex;gap:0.75rem;flex-wrap:wrap;}
        .pd-size-btn{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.6rem 1rem;text-align:left;transition:var(--transition);cursor:pointer;}
        .pd-size-btn:hover,.pd-size-btn.active{border-color:var(--gold);background:rgba(201,168,76,0.08);}
        .pd-size-btn__label{display:block;font-size:0.8rem;font-weight:500;color:var(--text-primary);}
        .pd-size-btn__dim{display:block;font-size:0.72rem;color:var(--text-muted);}
        .pd-size-btn__price{display:block;font-size:0.8rem;color:var(--gold);margin-top:0.2rem;}
        .pd-qty{margin-bottom:2rem;}
        .pd-qty__ctrl{display:inline-flex;align-items:center;border:1px solid var(--border);border-radius:var(--radius-sm);overflow:hidden;}
        .pd-qty__ctrl button{width:40px;height:40px;font-size:1.2rem;color:var(--text-secondary);background:var(--bg-card);cursor:pointer;transition:var(--transition);}
        .pd-qty__ctrl button:hover{color:var(--gold);}
        .pd-qty__ctrl span{width:48px;text-align:center;font-size:0.95rem;color:var(--text-primary);}
        .pd-actions{display:flex;gap:0.75rem;margin-bottom:2rem;}
        .pd-add-btn{flex:1;justify-content:center;}
        .pd-add-btn.added{background:linear-gradient(135deg,#3a7d44,#2d6235);}
        .pd-wish-btn{padding:0.75rem 1rem;}
        .pd-meta{border-top:1px solid var(--border);padding-top:1.25rem;display:flex;flex-direction:column;gap:0.6rem;}
        .pd-meta__item{display:flex;gap:0.75rem;font-size:0.84rem;}
        .pd-meta__item span{color:var(--text-muted);min-width:70px;}
        .pd-meta__item p{color:var(--text-secondary);}
        @media(max-width:900px){.pd-layout{grid-template-columns:1fr;gap:2rem;}}
      `}</style>
    </div>
  );
}
