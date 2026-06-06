import React, { useState, useEffect } from 'react';
import './PageCommon.css';

const MOCK_NEWS = [
  { id: 1, title: 'Bitcoin surges past $67,000 as institutional demand grows', source: 'CoinDesk', time: '2h ago', tag: 'BTC', url: '#', summary: 'Bitcoin reached a new monthly high as ETF inflows accelerated, signaling renewed institutional confidence in the flagship cryptocurrency.' },
  { id: 2, title: 'Ethereum network upgrades boost transaction speeds', source: 'CryptoSlate', time: '4h ago', tag: 'ETH', url: '#', summary: 'The latest Ethereum upgrade has reduced gas fees significantly and improved throughput, making the network more competitive.' },
  { id: 3, title: 'Livestock markets steady as feed costs decline', source: 'AgriNews', time: '5h ago', tag: 'CATTLE', url: '#', summary: 'Live cattle futures held steady as declining corn prices reduced input costs for ranchers, improving profit margins across the sector.' },
  { id: 4, title: 'Solana DeFi volume hits record $4.2B monthly', source: 'The Block', time: '6h ago', tag: 'SOL', url: '#', summary: 'Solana\'s decentralized finance ecosystem saw explosive growth with a new monthly record for trading volume.' },
  { id: 5, title: 'Pork belly futures dip on seasonal demand shift', source: 'CME Group', time: '8h ago', tag: 'HOGS', url: '#', summary: 'Lean hog futures saw moderate selling pressure as summer BBQ season winds down, impacting short-term price outlook.' },
  { id: 6, title: 'Crypto regulation update: SEC opens new framework', source: 'Reuters', time: '10h ago', tag: 'REGULATION', url: '#', summary: 'The SEC announced a new regulatory framework for digital assets, providing clearer guidance for exchanges and token issuers.' },
  { id: 7, title: 'BNB Chain launches new cross-chain bridge', source: 'BNB Chain Blog', time: '12h ago', tag: 'BNB', url: '#', summary: 'Binance Smart Chain\'s new cross-chain bridge enables seamless asset transfers between 15 major blockchain networks.' },
  { id: 8, title: 'Global beef demand rises 8% year-over-year', source: 'USDA', time: '1d ago', tag: 'CATTLE', url: '#', summary: 'USDA data shows global beef consumption increased 8% compared to the same period last year, driven by Asian market growth.' },
];

const TAGS = ['All', 'BTC', 'ETH', 'SOL', 'CATTLE', 'HOGS', 'REGULATION'];

export default function NewsPage() {
  const [news, setNews] = useState(MOCK_NEWS);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const filtered = filter === 'All' ? news : news.filter(n => n.tag === filter);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>📰 Market News</h1>
          <p className="page-sub">Latest from crypto & livestock markets</p>
        </div>
        <div className="live-indicator"><span className="live-dot" />Live</div>
      </div>

      <div className="tag-filters">
        {TAGS.map(t => (
          <button key={t} className={`tag-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="news-grid">
        {filtered.map(n => (
          <article key={n.id} className="news-card glass">
            <div className="news-top">
              <span className="news-tag">{n.tag}</span>
              <span className="news-time">{n.time}</span>
            </div>
            <h3 className="news-title">{n.title}</h3>
            <p className="news-summary">{n.summary}</p>
            <div className="news-footer">
              <span className="news-source">📡 {n.source}</span>
              <a href={n.url} className="news-read">Read more →</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
