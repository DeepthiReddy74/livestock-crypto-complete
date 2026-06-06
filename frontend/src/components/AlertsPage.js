import React, { useState } from 'react';
import './PageCommon.css';

const INIT = [
  { id: 1, symbol: 'BTC', condition: 'above', price: 70000, active: true },
  { id: 2, symbol: 'ETH', condition: 'below', price: 3000, active: true },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(INIT);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ symbol: '', condition: 'above', price: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const addAlert = e => {
    e.preventDefault();
    setAlerts(prev => [...prev, { id: Date.now(), symbol: form.symbol.toUpperCase(), condition: form.condition, price: parseFloat(form.price), active: true }]);
    setForm({ symbol: '', condition: 'above', price: '' });
    setShowAdd(false);
  };

  const toggle = id => setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const remove = id => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>🔔 Price Alerts</h1>
          <p className="page-sub">Get notified when prices hit your targets</p>
        </div>
        <button className="add-btn" onClick={() => setShowAdd(s => !s)}>+ New Alert</button>
      </div>

      {showAdd && (
        <form className="add-form glass" onSubmit={addAlert}>
          <h3>Create Alert</h3>
          <div className="add-fields">
            <input placeholder="Symbol (e.g. BTC)" value={form.symbol} onChange={set('symbol')} required />
            <select value={form.condition} onChange={set('condition')}>
              <option value="above">Price goes above</option>
              <option value="below">Price goes below</option>
            </select>
            <input type="number" placeholder="Target Price ($)" value={form.price} onChange={set('price')} step="any" required />
          </div>
          <div className="form-actions">
            <button type="submit" className="add-btn">Create Alert</button>
            <button type="button" className="cancel-btn" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}

      {alerts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔔</div>
          <h3>No alerts set</h3>
          <p>Create a price alert to get notified when markets move.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(a => (
            <div key={a.id} className={`alert-item glass ${!a.active ? 'alert-inactive' : ''}`}>
              <div className="alert-icon">🔔</div>
              <div className="alert-info">
                <strong>{a.symbol}</strong>
                <span>{a.condition === 'above' ? '↑ Goes above' : '↓ Goes below'} <span className="mono">${a.price.toLocaleString()}</span></span>
              </div>
              <div className="alert-actions">
                <button className={`toggle-btn ${a.active ? 'active' : ''}`} onClick={() => toggle(a.id)}>
                  {a.active ? 'Active' : 'Paused'}
                </button>
                <button className="ac-remove" onClick={() => remove(a.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
