import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const PAGES = [
  { id: 'dashboard', label: '◈ Dashboard', icon: '⊞' },
  { id: 'watchlist', label: 'Watchlist', icon: '⭐' },
  { id: 'portfolio', label: 'Portfolio', icon: '💼' },
  { id: 'alerts', label: 'Alerts', icon: '🔔' },
  { id: 'news', label: 'News', icon: '📰' },
];

export default function Navbar({ page, setPage, openAuth }) {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar glass">
      <div className="navbar-inner">
        <button className="nav-logo" onClick={() => setPage('landing')}>
          <span className="logo-icon">◈</span>
          <span>CryptoLive</span>
        </button>

        <div className="nav-links">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`nav-link ${page === p.id ? 'active' : ''}`}
              onClick={() => setPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <div className="live-dot" title="Live data" />
          {isLoggedIn ? (
            <div className="nav-user">
              <span className="user-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
              <span className="user-name">{user?.name}</span>
              <button className="nav-logout" onClick={logout}>Sign out</button>
            </div>
          ) : (
            <div className="nav-auth-btns">
              <button className="btn-ghost" onClick={() => openAuth('login')}>Log in</button>
              <button className="btn-primary" onClick={() => openAuth('register')}>Sign up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
