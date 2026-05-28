import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await registerUser(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">✦ Artivo</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join the Artivo community</p>
        <div className="gold-line" />

        <form onSubmit={handleSubmit} style={{ marginTop: '1.75rem' }}>
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Min. 6 characters' },
            { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: 'Repeat password' },
          ].map(f => (
            <div key={f.name} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-input" type={f.type} placeholder={f.placeholder} value={form[f.name]}
                onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))} required />
            </div>
          ))}
          <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" style={{ color: 'var(--gold)' }}>Sign in</Link>
        </p>
      </div>

      <style>{`
        .auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%), var(--bg-deep);}
        .auth-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:3rem;width:100%;max-width:420px;text-align:center;}
        .auth-brand{font-family:var(--font-display);font-size:2rem;font-weight:300;color:var(--gold);margin-bottom:1.5rem;}
        .auth-title{font-family:var(--font-display);font-size:1.8rem;font-weight:300;margin-bottom:0.4rem;}
        .auth-sub{font-size:0.85rem;color:var(--text-muted);}
        .auth-footer{margin-top:1.5rem;font-size:0.85rem;color:var(--text-muted);}
      `}</style>
    </div>
  );
}
