import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { createMessage } from '../services/messageService';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMessage(form);
      setSent(true);
      toast.success('Message sent! We\'ll reply within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="page-header">
        <div className="container">
          <p className="section-subtitle">Get in Touch</p>
          <h1 className="section-title">Contact <em>Us</em></h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            We'd love to hear from you. We reply within 24 hours.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, marginBottom: '1.5rem' }}>
              Let's Talk <em style={{ color: 'var(--gold)' }}>Art</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '0.9rem' }}>
              Whether you have a question about sizing, custom orders, or just want to chat about art — we're here for you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <FiPhone />, label: 'Phone', value: '+94 76 xxx xxxx' },
                { icon: <FiMail />, label: 'Email', value: 'hello@artivospace.com' },
                { icon: <FiMapPin />, label: 'Location', value: 'Colombo, Sri Lanka' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{c.label}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: <FiFacebook />, href: 'https://facebook.com/artivo' },
                  { icon: <FiInstagram />, href: 'https://instagram.com/artivo' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    style={{ width: '40px', height: '40px', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'var(--transition)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24 hours.</p>
                <button className="btn btn-outline" style={{ marginTop: '1.5rem' }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, marginBottom: '1.5rem' }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input className="form-input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="How can we help?" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea className="form-input" rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your enquiry…" style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          div[style*='grid-template-columns: 1fr 1.4fr']{grid-template-columns:1fr!important;}
        }
      `}</style>
    </div>
  );
}
