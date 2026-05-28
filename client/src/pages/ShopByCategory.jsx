import { Link } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Sri Lankan Heritage', emoji: '🏛️', desc: 'Timeless motifs from the island\'s rich cultural past.' },
  { label: 'Modern', emoji: '🎨', desc: 'Clean lines and contemporary aesthetics for modern spaces.' },
  { label: 'Portraits & Figures', emoji: '🖼️', desc: 'Expressive human forms and iconic character studies.' },
  { label: 'Nautical & Coastal', emoji: '🌊', desc: 'Serene seascapes, ships, and ocean-inspired art.' },
  { label: 'Horses', emoji: '🐎', desc: 'Majestic equine prints full of power and grace.' },
  { label: 'Elephants', emoji: '🐘', desc: 'Regal elephant art celebrating Sri Lanka\'s national symbol.' },
  { label: 'Abstract', emoji: '🌀', desc: 'Bold shapes, color, and form that ignite imagination.' },
  { label: 'Nature', emoji: '🌿', desc: 'Botanical prints and lush natural landscapes.' },
  { label: 'Cityscape', emoji: '🏙️', desc: 'Urban skylines and architectural art for city lovers.' },
  { label: 'Floral', emoji: '🌸', desc: 'Delicate flowers and garden-inspired masterpieces.' },
];

export default function ShopByCategory() {
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="page-header">
        <div className="container">
          <p className="section-subtitle">Discover</p>
          <h1 className="section-title">Shop by <em>Category</em></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>Find the perfect style for your space</p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.label} to={`/products?category=${encodeURIComponent(cat.label)}`} className="cat-full-card">
              <div className="cat-full-card__emoji">{cat.emoji}</div>
              <h3 className="cat-full-card__title">{cat.label}</h3>
              <p className="cat-full-card__desc">{cat.desc}</p>
              <span className="cat-full-card__link">Shop Now →</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cat-full-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;gap:0.6rem;transition:var(--transition);position:relative;overflow:hidden;}
        .cat-full-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);transform:scaleX(0);transition:transform 0.3s;}
        .cat-full-card:hover{border-color:var(--border-hover);transform:translateY(-5px);box-shadow:var(--shadow-card);}
        .cat-full-card:hover::before{transform:scaleX(1);}
        .cat-full-card__emoji{font-size:2.5rem;margin-bottom:0.4rem;}
        .cat-full-card__title{font-family:var(--font-display);font-size:1.3rem;font-weight:400;color:var(--text-primary);}
        .cat-full-card__desc{font-size:0.84rem;color:var(--text-muted);line-height:1.6;flex:1;}
        .cat-full-card__link{font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);margin-top:0.5rem;transition:letter-spacing 0.2s;}
        .cat-full-card:hover .cat-full-card__link{letter-spacing:0.18em;}
      `}</style>
    </div>
  );
}
