import { Link } from 'react-router-dom';

const COLOURS = [
  { name: 'Gold & Amber', hex: '#c9a84c', query: 'gold' },
  { name: 'Navy Blue', hex: '#1a3a5c', query: 'navy' },
  { name: 'Emerald Green', hex: '#1e5c3a', query: 'green' },
  { name: 'Burgundy', hex: '#6e1a2a', query: 'red' },
  { name: 'Ivory & Cream', hex: '#e8dcc8', query: 'cream' },
  { name: 'Charcoal', hex: '#2d2d2d', query: 'black' },
  { name: 'Terracotta', hex: '#c0633a', query: 'orange' },
  { name: 'Dusty Rose', hex: '#c08080', query: 'pink' },
  { name: 'Ocean Teal', hex: '#2a7a8a', query: 'teal' },
  { name: 'Warm Purple', hex: '#6a3a7a', query: 'purple' },
];

export default function ShopByColour() {
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="page-header">
        <div className="container">
          <p className="section-subtitle">Filter by Tone</p>
          <h1 className="section-title">Shop by <em>Colour</em></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>Match your canvas art to your interior palette</p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {COLOURS.map(col => (
            <Link key={col.name} to={`/products?color=${col.query}`} className="colour-card">
              <div className="colour-card__swatch" style={{ background: col.hex }} />
              <p className="colour-card__name">{col.name}</p>
              <span className="colour-card__cta">Browse →</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .colour-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;transition:var(--transition);display:flex;flex-direction:column;}
        .colour-card:hover{border-color:var(--border-hover);transform:translateY(-4px);box-shadow:var(--shadow-card);}
        .colour-card__swatch{height:120px;width:100%;}
        .colour-card__name{padding:0.85rem 1rem 0.25rem;font-family:var(--font-display);font-size:1rem;color:var(--text-primary);}
        .colour-card__cta{padding:0 1rem 0.85rem;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);}
      `}</style>
    </div>
  );
}
