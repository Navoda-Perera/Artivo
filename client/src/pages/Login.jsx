import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">✦ Artivo</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-sub">Sign in to your account</p>
        <div className="gold-line" />

        <form onSubmit={handleSubmit} style={{ marginTop: '1.75rem' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          </div>
          <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register" style={{ color: 'var(--gold)' }}>Create one</Link>
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
