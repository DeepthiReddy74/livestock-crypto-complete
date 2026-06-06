import React, { useState } from 'react';
import './PageCommon.css';

const INIT = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', qty: 0.5, buyPrice: 58000, currentPrice: 67234, type: 'crypto' },
  { id: 2, symbol: 'ETH', name: 'Ethereum', qty: 2, buyPrice: 3100, currentPrice: 3521, type: 'crypto' },
  { id: 3, symbol: 'CATTLE', name: 'Live Cattle', qty: 500, buyPrice: 1.75, currentPrice: 1.82, type: 'livestock', unit: 'lb' },
];

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState(INIT);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ symbol: '', name: '', qty: '', buyPrice: '', currentPrice: '', type: 'crypto' });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const addHolding = e => {
    e.preventDefault();
    setHoldings(prev => [...prev, {
      id: Date.now(), symbol: form.symbol.toUpperCase(), name: form.name,
      qty: parseFloat(form.qty), buyPrice: parseFloat(form.buyPrice),
      currentPrice: parseFloat(form.currentPrice), type: form.type,
    }]);
    setForm({ symbol: '', name: '', qty: '', buyPrice: '', currentPrice: '', type: 'crypto' });
    setShowAdd(false);
  };

  const totalValue = holdings.reduce((s, h) => s + h.qty * h.currentPrice, 0);
  const totalCost = holdings.reduce((s, h) => s + h.qty * h.buyPrice, 0);
  const totalPnL = totalValue - totalCost;
  const totalPct = ((totalPnL / totalCost) * 100).toFixed(2);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>💼 Portfolio</h1>
          <p className="page-sub">Track your holdings & P&L</p>
        </div>
        <button className="add-btn" onClick={() => setShowAdd(s => !s)}>+ Add Holding</button>
      </div>

      {/* Summary cards */}
      <div className="summary-row">
        <div className="summary-card glass">
          <span>Total Value</span>
          <strong className="mono">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="summary-card glass">
          <span>Total Cost</span>
          <strong className="mono">${totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="summary-card glass">
          <span>Total P&L</span>
          <strong className={`mono ${totalPnL >= 0 ? 'up' : 'down'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </strong>
        </div>
        <div className="summary-card glass">
          <span>Return</span>
          <strong className={totalPnL >= 0 ? 'up' : 'down'}>{totalPnL >= 0 ? '+' : ''}{totalPct}%</strong>
        </div>
      </div>

      {showAdd && (
        <form className="add-form glass" onSubmit={addHolding}>
          <h3>Add Holding</h3>
          <div className="add-fields">
            <input placeholder="Symbol (e.g. BTC)" value={form.symbol} onChange={set('symbol')} required />
            <input placeholder="Name (e.g. Bitcoin)" value={form.name} onChange={set('name')} required />
            <input type="number" placeholder="Quantity" value={form.qty} onChange={set('qty')} step="any" required />
            <input type="number" placeholder="Buy Price ($)" value={form.buyPrice} onChange={set('buyPrice')} step="any" required />
            <input type="number" placeholder="Current Price ($)" value={form.currentPrice} onChange={set('currentPrice')} step="any" required />
            <select value={form.type} onChange={set('type')}>
              <option value="crypto">Crypto</option>
              <option value="livestock">Livestock</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="add-btn">Add</button>
            <button type="button" className="cancel-btn" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Holdings table */}
      <div className="portfolio-table glass">
        <div className="pt-header">
          <span>Asset</span><span>Qty</span><span>Buy Price</span><span>Current</span><span>Value</span><span>P&L</span><span></span>
        </div>
        {holdings.map(h => {
          const value = h.qty * h.currentPrice;
          const pnl = (h.currentPrice - h.buyPrice) * h.qty;
          const pct = ((h.currentPrice - h.buyPrice) / h.buyPrice * 100).toFixed(2);
          return (
            <div key={h.id} className="pt-row">
              <div className="pt-asset">
                <span className={`pt-badge ${h.type === 'livestock' ? 'badge-live' : 'badge-crypto'}`}>
                  {h.type === 'livestock' ? '🐄' : '₿'}
                </span>
                <div>
                  <div className="pt-sym">{h.symbol}</div>
                  <div className="pt-name">{h.name}</div>
                </div>
              </div>
              <span className="mono">{h.qty}{h.unit ? ' ' + h.unit : ''}</span>
              <span className="mono">${h.buyPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              <span className="mono">${h.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              <span className="mono">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              <span className={`mono ${pnl >= 0 ? 'up' : 'down'}`}>
                {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pct}%)
              </span>
              <button className="ac-remove" onClick={() => setHoldings(prev => prev.filter(x => x.id !== h.id))}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
