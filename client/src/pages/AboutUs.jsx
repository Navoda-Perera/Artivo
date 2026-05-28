export default function AboutUs() {
  const team = [
    { name: 'Kavinda Perera', role: 'Founder & Creative Director', initial: 'K' },
    { name: 'Nimasha Silva', role: 'Head of Curation', initial: 'N' },
    { name: 'Ruwan Jayasinghe', role: 'Production Manager', initial: 'R' },
  ];

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="page-header">
        <div className="container">
          <p className="section-subtitle">Our Story</p>
          <h1 className="section-title">About <em>Artivo</em></h1>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="section-subtitle">Mission</p>
            <h2 className="section-title">We Believe Every Wall<br /><em>Deserves a Story</em></h2>
            <div className="gold-line" />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.9', marginTop: '1.5rem' }}>
              Artivo was born from a passion for transforming ordinary spaces into inspiring sanctuaries.
              We handpick and produce premium printed canvas art that bridges timeless heritage with
              contemporary design — from the rich cultural tapestry of Sri Lanka to bold modern abstracts.
              Every canvas we create is crafted with gallery-grade materials and obsessive attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-subtitle">What Drives Us</p>
            <h2 className="section-title">Our <em>Values</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🎨', title: 'Artistry', desc: 'Every print is treated as a work of art, not just a product.' },
              { icon: '✦', title: 'Quality', desc: 'Gallery-grade canvas and archival inks that last decades.' },
              { icon: '🌿', title: 'Sustainability', desc: 'Eco-conscious packaging and responsible sourcing.' },
              { icon: '❤️', title: 'Community', desc: 'Supporting local Sri Lankan artists and heritage.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section-subtitle">The People</p>
            <h2 className="section-title">Meet the <em>Team</em></h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {team.map(m => (
              <div key={m.name} style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', width: '200px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: '600', color: '#0d0c0a', margin: '0 auto 1rem' }}>
                  {m.initial}
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>{m.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
