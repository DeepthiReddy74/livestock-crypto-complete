import React, { useEffect, useState } from 'react';
import './Landing.css';

const TICKERS = [
  { s: 'BTC', p: '$67,234', c: '+2.4%', up: true },
  { s: 'ETH', p: '$3,521', c: '+1.8%', up: true },
  { s: 'SOL', p: '$182', c: '-0.9%', up: false },
  { s: 'BNB', p: '$412', c: '+0.6%', up: true },
  { s: 'AVAX', p: '$38', c: '-1.2%', up: false },
  { s: 'CATTLE', p: '$1.82/lb', c: '+0.3%', up: true },
  { s: 'HOGS', p: '$0.91/lb', c: '-0.5%', up: false },
  { s: 'SHEEP', p: '$2.14/lb', c: '+1.1%', up: true },
];

const FEATURES = [
  { icon: '⚡', title: 'Live Prices', desc: 'Real-time crypto & livestock prices updated every 30 seconds from global markets.' },
  { icon: '📊', title: 'Advanced Charts', desc: 'Interactive price charts with multiple timeframes and technical overlays.' },
  { icon: '💼', title: 'Portfolio Tracker', desc: 'Track your holdings, P&L, and performance across all your assets.' },
  { icon: '⭐', title: 'Smart Watchlist', desc: 'Monitor your favourite assets at a glance with instant alerts.' },
  { icon: '🔔', title: 'Price Alerts', desc: 'Set custom price targets and get notified when markets move your way.' },
  { icon: '📰', title: 'Market News', desc: 'Curated news feed from top financial sources, powered by live feeds.' },
];

const STATS = [
  { n: '50K+', l: 'Active Users' },
  { n: '$2.4B', l: 'Volume Tracked' },
  { n: '200+', l: 'Assets Listed' },
  { n: '99.9%', l: 'Uptime' },
];

export default function Landing({ onGetStarted, onLogin, setPage, isLoggedIn }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="logo-icon">◈</span>
            <span>CryptoLive</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#stats">Stats</a>
            {isLoggedIn ? (
              <button className="btn-primary" onClick={() => setPage('dashboard')}>Dashboard →</button>
            ) : (
              <>
                <button className="btn-ghost" onClick={onLogin}>Log In</button>
                <button className="btn-primary" onClick={onGetStarted}>Get Started</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-sym">{t.s}</span>
              <span className="ticker-price mono">{t.p}</span>
              <span className={`ticker-change ${t.up ? 'up' : 'down'}`}>{t.c}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">🚀 Real-time Market Intelligence</div>
          <h1 className="hero-title">
            Trade Smarter.<br />
            <span className="hero-gradient">Track Everything.</span>
          </h1>
          <p className="hero-sub">
            The only platform combining <strong>crypto</strong> and <strong>livestock markets</strong> in one powerful dashboard. Live prices, charts, portfolio tracking, and alerts — all in one place.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={onGetStarted}>
              Start Free →
            </button>
            <button className="hero-demo" onClick={() => setPage('dashboard')}>
              View Demo
            </button>
          </div>
          <div className="hero-trust">
            <span>✓ No credit card required</span>
            <span>✓ Free forever plan</span>
            <span>✓ Live data</span>
          </div>
        </div>

        {/* Mock dashboard preview */}
        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header">
              <span>BTC / USD</span>
              <span className="up">+2.4%</span>
            </div>
            <div className="preview-price mono">$67,234.50</div>
            <div className="preview-chart">
              <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,50 L20,42 L40,45 L60,30 L80,35 L100,20 L120,25 L140,15 L160,18 L180,8 L200,5" stroke="#00e5ff" strokeWidth="2" fill="none"/>
                <path d="M0,50 L20,42 L40,45 L60,30 L80,35 L100,20 L120,25 L140,15 L160,18 L180,8 L200,5 L200,60 L0,60Z" fill="url(#cg)"/>
              </svg>
            </div>
          </div>
          <div className="preview-stats">
            {[{ l: 'Market Cap', v: '$1.32T' }, { l: '24h Vol', v: '$42.1B' }, { l: 'Dominance', v: '52.3%' }].map(s => (
              <div key={s.l} className="preview-stat">
                <span className="preview-stat-l">{s.l}</span>
                <span className="preview-stat-v mono">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="stats-section">
        {STATS.map(s => (
          <div key={s.n} className="stat-item">
            <div className="stat-num">{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="section-label">EVERYTHING YOU NEED</div>
        <h2 className="section-title">Built for serious traders</h2>
        <p className="section-sub">From first-time investors to professional traders — CryptoLive has the tools you need.</p>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card glass">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-orb" />
        <h2>Ready to trade smarter?</h2>
        <p>Join 50,000+ traders already using CryptoLive.</p>
        <button className="hero-cta" onClick={onGetStarted}>Create Free Account →</button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">◈ CryptoLive</div>
        <p>© 2026 CryptoLive. Real-time crypto & livestock market data.</p>
      </footer>
    </div>
  );
}
