import React, { useState, useEffect } from 'react';
import { watchlistApi } from '../services/api';
import './PageCommon.css';

const MOCK = [
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', currentPrice: 67234, priceChangePercent: 2.4 },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto', currentPrice: 3521, priceChangePercent: 1.8 },
  { symbol: 'CATTLE', name: 'Live Cattle', type: 'livestock', currentPrice: 1.82, priceChangePercent: 0.34 },
];

export default function WatchlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    watchlistApi.getAll()
      .then(({ data }) => setItems(Array.isArray(data) ? data : MOCK))
      .catch(() => setItems(MOCK))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async sym => {
    try { await watchlistApi.remove(sym); } catch {}
    setItems(prev => prev.filter(i => i.symbol !== sym));
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>⭐ Watchlist</h1>
          <p className="page-sub">Your tracked assets</p>
        </div>
        <button className="refresh-btn" onClick={load}>↻ Refresh</button>
      </div>

      {loading ? <div className="page-loading">Loading...</div> : (
        items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <h3>No assets yet</h3>
            <p>Search for an asset on the Dashboard and add it to your watchlist.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {items.map(item => {
              const up = item.priceChangePercent >= 0;
              return (
                <div key={item.symbol} className="asset-card glass">
                  <div className="ac-top">
                    <div>
                      <div className="ac-sym">{item.symbol}</div>
                      <div className="ac-name">{item.name}</div>
                    </div>
                    <span className={`ac-type ${item.type === 'livestock' ? 'type-live' : 'type-crypto'}`}>
                      {item.type === 'livestock' ? '🐄' : '₿'}
                    </span>
                  </div>
                  <div className="ac-price mono">${Number(item.currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  <div className={`ac-change ${up ? 'up' : 'down'}`}>
                    {up ? '▲' : '▼'} {Math.abs(item.priceChangePercent).toFixed(2)}%
                  </div>
                  <button className="ac-remove" onClick={() => remove(item.symbol)}>Remove ✕</button>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
