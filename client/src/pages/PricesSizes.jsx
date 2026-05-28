const SIZES = [
  {
    type: 'Single Canvas',
    emoji: '▪',
    sizes: [
      { label: 'XS', dim: '20 × 30 cm', price: 3500 },
      { label: 'S',  dim: '30 × 40 cm', price: 5500 },
      { label: 'M',  dim: '40 × 60 cm', price: 7500 },
      { label: 'L',  dim: '60 × 90 cm', price: 11000 },
      { label: 'XL', dim: '90 × 120 cm', price: 16500 },
    ],
  },
  {
    type: '2-Piece Set',
    emoji: '▪▪',
    sizes: [
      { label: 'S', dim: '2 × 20×40 cm', price: 8500 },
      { label: 'M', dim: '2 × 30×60 cm', price: 13000 },
      { label: 'L', dim: '2 × 40×80 cm', price: 19500 },
    ],
  },
  {
    type: '3-Piece Triptych',
    emoji: '▪▪▪',
    sizes: [
      { label: 'S', dim: '3 × 20×40 cm', price: 12000 },
      { label: 'M', dim: '3 × 30×60 cm', price: 18500 },
      { label: 'L', dim: '3 × 40×80 cm', price: 26000 },
    ],
  },
  {
    type: '4-Piece Set',
    emoji: '⊞',
    sizes: [
      { label: 'M', dim: '4 × 25×35 cm', price: 18000 },
      { label: 'L', dim: '4 × 30×50 cm', price: 24000 },
    ],
  },
  {
    type: '5-Piece Set',
    emoji: '⊟',
    sizes: [
      { label: 'M', dim: '5 × 20×40 cm', price: 22000 },
      { label: 'L', dim: '5 × 30×60 cm', price: 32000 },
    ],
  },
];

export default function PricesSizes() {
  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="page-header">
        <div className="container">
          <p className="section-subtitle">Transparent Pricing</p>
          <h1 className="section-title">Prices <em>&amp; Sizes</em></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            All prices in Sri Lankan Rupees. Custom sizes available on request.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {SIZES.map(group => (
            <div key={group.type} className="price-group">
              <div className="price-group__header">
                <span className="price-group__emoji">{group.emoji}</span>
                <h2 className="price-group__title">{group.type}</h2>
              </div>
              <div className="price-group__table-wrap">
                <table className="price-table">
                  <thead>
                    <tr><th>Size</th><th>Dimensions</th><th>Price (Rs.)</th></tr>
                  </thead>
                  <tbody>
                    {group.sizes.map(s => (
                      <tr key={s.label}>
                        <td><strong>{s.label}</strong></td>
                        <td>{s.dim}</td>
                        <td style={{ color: 'var(--gold)', fontWeight: 500 }}>Rs. {s.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="price-note">
          <h3>📞 Custom Orders</h3>
          <p>Need a custom size or bulk order? Contact us at <strong>+94 76 282 9197</strong> or visit our Facebook page. We'll craft the perfect canvas for your space.</p>
        </div>
      </div>

      <style>{`
        .price-group{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden;}
        .price-group__header{display:flex;align-items:center;gap:1rem;padding:1.25rem 1.5rem;background:var(--bg-surface);border-bottom:1px solid var(--border);}
        .price-group__emoji{font-size:1.3rem;color:var(--gold);letter-spacing:0.05em;}
        .price-group__title{font-family:var(--font-display);font-size:1.3rem;font-weight:400;}
        .price-group__table-wrap{overflow-x:auto;}
        .price-table{width:100%;border-collapse:collapse;font-size:0.9rem;}
        .price-table th{padding:0.75rem 1.5rem;text-align:left;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);font-weight:400;background:rgba(201,168,76,0.04);}
        .price-table td{padding:0.75rem 1.5rem;border-top:1px solid var(--border);color:var(--text-secondary);}
        .price-table tr:hover td{background:rgba(255,255,255,0.02);}
        .price-note{margin-top:3rem;background:linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.03));border:1px solid var(--border-hover);border-radius:var(--radius-lg);padding:2rem 2.5rem;}
        .price-note h3{font-family:var(--font-display);font-size:1.4rem;font-weight:300;margin-bottom:0.75rem;color:var(--text-primary);}
        .price-note p{font-size:0.9rem;color:var(--text-secondary);line-height:1.7;}
        .price-note strong{color:var(--gold);}
      `}</style>
    </div>
  );
}
