import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './Home.css';

const CATEGORIES = [
  { label: 'Sri Lankan Heritage', emoji: '🏛️', to: '/products?category=Sri Lankan Heritage' },
  { label: 'Modern', emoji: '🎨', to: '/products?category=Modern' },
  { label: 'Portraits & Figures', emoji: '🖼️', to: '/products?category=Portraits & Figures' },
  { label: 'Nautical & Coastal', emoji: '🌊', to: '/products?category=Nautical & Coastal' },
  { label: 'Horses', emoji: '🐎', to: '/products?category=Horses' },
  { label: 'Elephants', emoji: '🐘', to: '/products?category=Elephants' },
];

const PIECE_TYPES = [
  { label: 'Single Canvas', icon: '▪', desc: 'One bold statement piece' },
  { label: '2-Piece Set', icon: '▪▪', desc: 'Perfectly balanced duo' },
  { label: '3-Piece Triptych', icon: '▪▪▪', desc: 'Timeless three-panel art' },
  { label: '4-Piece Set', icon: '⊞', desc: 'Dramatic quad display' },
  { label: '5-Piece Set', icon: '⊟', desc: 'Grand panoramic art' },
];

const FEATURES = [
  { icon: '🎨', title: 'Premium Canvas', desc: 'Gallery-quality cotton canvas for vivid, lasting prints.' },
  { icon: '✦', title: 'Custom Sizes', desc: 'From intimate 20×30 to statement 100×150 cm.' },
  { icon: '🚚', title: 'Island-wide Delivery', desc: 'Fast & careful delivery across Sri Lanka.' },
  { icon: '🔒', title: 'Secure Checkout', desc: 'Safe payment & hassle-free returns.' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then(({ data }) => setFeatured(data.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <p className="section-subtitle">Premium Printed Canvas Art</p>
          <h1 className="hero__title">
            Transform Your<br /><em>Walls Into Stories</em>
          </h1>
          <p className="hero__desc">
            Discover handpicked canvas art — from Sri Lankan heritage to modern masterpieces.
            Every piece tells a story worth displaying.
          </p>
          <div className="hero__ctas">
            <Link to="/products" className="btn btn-gold">Shop All Art</Link>
            <Link to="/shop-by-category" className="btn btn-outline">Browse Categories</Link>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><span>500+</span><p>Artworks</p></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span>10k+</span><p>Happy Homes</p></div>
            <div className="hero__stat-divider" />
            <div className="hero__stat"><span>25+</span><p>Categories</p></div>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="features-strip">
        <div className="container features-strip__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="features-strip__item">
              <span className="features-strip__icon">{f.icon}</span>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section home-categories">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Explore</p>
            <h2 className="section-title">Popular <em>Categories</em></h2>
            <div className="gold-line" style={{ margin: '0.75rem 0 0' }} />
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} to={cat.to} className="cat-card">
                <div className="cat-card__icon">{cat.emoji}</div>
                <h3 className="cat-card__label">{cat.label}</h3>
                <span className="cat-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIECE TYPES ── */}
      <section className="piece-types section">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Collections</p>
            <h2 className="section-title">Shop by <em>Piece Type</em></h2>
            <div className="gold-line" style={{ margin: '0.75rem 0 0' }} />
          </div>
          <div className="piece-types__grid">
            {PIECE_TYPES.map((pt) => (
              <Link key={pt.label} to={`/products?pieceType=${encodeURIComponent(pt.label)}`} className="piece-card">
                <div className="piece-card__icon">{pt.icon}</div>
                <h3 className="piece-card__label">{pt.label}</h3>
                <p className="piece-card__desc">{pt.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--row">
            <div>
              <p className="section-subtitle">Curated</p>
              <h2 className="section-title">Featured <em>Artworks</em></h2>
            </div>
            <Link to="/products" className="btn btn-outline">View All</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : featured.length === 0 ? (
            <div className="home-empty">
              <p>No featured products yet. Add some from the admin panel!</p>
              <Link to="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>Browse All</Link>
            </div>
          ) : (
            <div className="products-grid">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <section className="home-banner">
        <div className="home-banner__inner container">
          <p className="section-subtitle">Limited Time</p>
          <h2 className="section-title">Free Delivery on Orders<br /><em>Over Rs. 10,000</em></h2>
          <p className="home-banner__sub">Island-wide delivery. Carefully packed. Always on time.</p>
          <Link to="/products" className="btn btn-gold">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}
