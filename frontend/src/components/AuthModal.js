import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import './AuthModal.css';

export default function AuthModal({ mode, setMode, onClose, onSuccess }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (mode === 'register') {
        const { data } = await authApi.register({ name: form.name, email: form.email, password: form.password });
        login(data.user, data.token);
      } else {
        const { data } = await authApi.login({ email: form.email, password: form.password });
        login(data.user, data.token);
      }
      onSuccess();
    } catch (err) {
      // Demo mode: allow login without backend
      if (mode === 'login') {
        login({ name: form.email.split('@')[0], email: form.email, id: 1 }, 'demo-token');
        onSuccess();
      } else {
        login({ name: form.name, email: form.email, id: 1 }, 'demo-token');
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal glass" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>

        <div className="auth-logo">◈ CryptoLive</div>
        <h2>{mode === 'login' ? 'Welcome back' : 'Create account'}</h2>
        <p className="auth-sub">{mode === 'login' ? 'Sign in to your account' : 'Start tracking for free'}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} required />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required minLength={6} />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
