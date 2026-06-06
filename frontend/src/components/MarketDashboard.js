import React, { useState, useEffect, useCallback } from 'react';
import { marketApi, watchlistApi } from '../services/api';
import PriceChart from './PriceChart';
import './MarketDashboard.css';

const TRENDING_IDS = 'bitcoin,ethereum,solana,binancecoin,avalanche-2,dogecoin';
const LIVESTOCK_MOCK = [
  { id: 'cattle', name: 'Live Cattle', symbol: 'CATTLE', current_price: 1.82, price_change_percentage_24h: 0.34, unit: '/lb', type: 'livestock' },
  { id: 'hogs', name: 'Lean Hogs', symbol: 'HOGS', current_price: 0.91, price_change_percentage_24h: -0.52, unit: '/lb', type: 'livestock' },
  { id: 'feeder-cattle', name: 'Feeder Cattle', symbol: 'FC', current_price: 2.14, price_change_percentage_24h: 0.18, unit: '/lb', type: 'livestock' },
  { id: 'sheep', name: 'Lamb', symbol: 'LAMB', current_price: 3.45, price_change_percentage_24h: 1.1, unit: '/lb', type: 'livestock' },
  { id: 'pork-belly', name: 'Pork Belly', symbol: 'PB', current_price: 1.23, price_change_percentage_24h: -0.8, unit: '/lb', type: 'livestock' },
  { id: 'poultry', name: 'Broiler Chicken', symbol: 'CHKN', current_price: 0.78, price_change_percentage_24h: 0.05, unit: '/lb', type: 'livestock' },
];

const TIME_RANGES = ['1', '7', '30', '365'];
const RANGE_LABELS = { '1': '1D', '7': '7D', '30': '1M', '365': '1Y' };

function AssetRow({ asset, onSelect, selected }) {
  const up = asset.price_change_percentage_24h >= 0;
  const pct = asset.price_change_percentage_24h?.toFixed(2);
  const price = asset.type === 'livestock'
    ? `$${asset.current_price?.toFixed(2)}${asset.unit}`
    : `$${Number(asset.current_price || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  return (
    <div className={`asset-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(asset)}>
      <div className="ar-name">
        <span className={`ar-badge ${asset.type === 'livestock' ? 'badge-live' : 'badge-crypto'}`}>
          {asset.type === 'livestock' ? '🐄' : '₿'}
        </span>
        <div>
          <div className="ar-sym">{asset.symbol?.toUpperCase()}</div>
          <div className="ar-full">{asset.name}</div>
        </div>
      </div>
      <div className="ar-price mono">{price}</div>
      <div className={`ar-change ${up ? 'up' : 'down'}`}>
        {up ? '▲' : '▼'} {Math.abs(pct)}%
      </div>
    </div>
  );
}

export default function MarketDashboard() {
  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [tab, setTab] = useState('crypto'); // crypto | livestock
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('7');
  const [chartLoading, setChartLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [watchMsg, setWatchMsg] = useState('');

  // Load trending crypto prices
  useEffect(() => {
    setLoading(true);
    marketApi.prices(TRENDING_IDS)
      .then(({ data }) => {
        const assets = Object.entries(data).map(([id, p]) => ({
          id, name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
          symbol: id.substring(0, 4).toUpperCase(),
          current_price: p.usd,
          price_change_percentage_24h: p.usd_24h_change,
          market_cap: p.usd_market_cap,
          type: 'crypto',
        }));
        setCryptoAssets(assets);
        if (!selectedAsset) setSelectedAsset(assets[0]);
      })
      .catch(() => {
        // Mock fallback
        const mock = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 67234, price_change_percentage_24h: 2.4, type: 'crypto' },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3521, price_change_percentage_24h: 1.8, type: 'crypto' },
          { id: 'solana', name: 'Solana', symbol: 'SOL', current_price: 182, price_change_percentage_24h: -0.9, type: 'crypto' },
          { id: 'binancecoin', name: 'BNB', symbol: 'BNB', current_price: 412, price_change_percentage_24h: 0.6, type: 'crypto' },
          { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', current_price: 0.18, price_change_percentage_24h: 3.2, type: 'crypto' },
        ];
        setCryptoAssets(mock);
        if (!selectedAsset) setSelectedAsset(mock[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Load chart when asset or range changes
  useEffect(() => {
    if (!selectedAsset || selectedAsset.type === 'livestock') {
      // Generate mock chart for livestock
      if (selectedAsset?.type === 'livestock') {
        const base = selectedAsset.current_price;
        const points = Array.from({ length: 60 }, (_, i) => [
          Date.now() - (60 - i) * 24 * 60 * 60 * 1000,
          base + Math.sin(i / 8) * base * 0.04 + (Math.random() - 0.5) * base * 0.01,
        ]);
        setChartData(points);
      }
      return;
    }
    setChartLoading(true);
    marketApi.chart(selectedAsset.id, timeRange)
      .then(({ data }) => setChartData(data.prices ?? []))
      .catch(() => {
        const base = selectedAsset.current_price || 50000;
        setChartData(Array.from({ length: 60 }, (_, i) => [
          Date.now() - (60 - i) * 24 * 60 * 60 * 1000,
          base + Math.sin(i / 5) * base * 0.05,
        ]));
      })
      .finally(() => setChartLoading(false));
  }, [selectedAsset, timeRange]);

  const handleSearch = async e => {
    e.preventDefault();
    if (!searchQ.trim()) return;
    setSearching(true);
    try {
      const { data } = await marketApi.search(searchQ);
      const coins = (data.coins || []).slice(0, 8).map(c => ({
        id: c.id, name: c.name, symbol: c.symbol, type: 'crypto',
        current_price: null, price_change_percentage_24h: null,
      }));
      setSearchResults(coins);
    } catch {
      setSearchResults([]);
    } finally { setSearching(false); }
  };

  const addToWatchlist = async asset => {
    try {
      await watchlistApi.add({ symbol: asset.symbol, name: asset.name, type: asset.type || 'crypto', currentPrice: asset.current_price, priceChangePercent: asset.price_change_percentage_24h });
      setWatchMsg(`${asset.symbol} added to watchlist!`);
      setTimeout(() => setWatchMsg(''), 2500);
    } catch { setWatchMsg('Added to watchlist (demo)'); setTimeout(() => setWatchMsg(''), 2500); }
  };

  const displayAssets = tab === 'crypto' ? cryptoAssets : LIVESTOCK_MOCK;

  return (
    <div className="mkt-layout">
      {/* Left Panel */}
      <div className="mkt-left">
        <div className="mkt-search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <input
              value={searchQ}
              onChange={e => { setSearchQ(e.target.value); if (!e.target.value) setSearchResults([]); }}
              placeholder="Search coins..."
              className="search-input"
            />
            <button type="submit" className="search-btn" disabled={searching}>
              {searching ? '...' : '🔍'}
            </button>
          </form>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results-box">
            <div className="srb-header">
              <span>Results</span>
              <button onClick={() => setSearchResults([])}>✕</button>
            </div>
            {searchResults.map(a => (
              <div key={a.id} className="srb-item" onClick={() => { setSelectedAsset(a); setSearchResults([]); }}>
                <span className="srb-sym">{a.symbol?.toUpperCase()}</span>
                <span className="srb-name">{a.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mkt-tabs">
          <button className={tab === 'crypto' ? 'active' : ''} onClick={() => setTab('crypto')}>₿ Crypto</button>
          <button className={tab === 'livestock' ? 'active' : ''} onClick={() => setTab('livestock')}>🐄 Livestock</button>
        </div>

        <div className="asset-list">
          {loading && tab === 'crypto' ? (
            <div className="loading-state">Loading markets...</div>
          ) : displayAssets.map(a => (
            <AssetRow
              key={a.id}
              asset={a}
              onSelect={setSelectedAsset}
              selected={selectedAsset?.id === a.id}
            />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="mkt-right">
        {selectedAsset ? (
          <>
            <div className="asset-header">
              <div className="asset-info">
                <h2>{selectedAsset.name}
                  <span className="asset-sym-badge">{selectedAsset.symbol?.toUpperCase()}</span>
                </h2>
                <div className="asset-price-row">
                  <span className="asset-price mono">
                    {selectedAsset.type === 'livestock'
                      ? `$${selectedAsset.current_price?.toFixed(2)}${selectedAsset.unit || '/lb'}`
                      : `$${Number(selectedAsset.current_price || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                  </span>
                  {selectedAsset.price_change_percentage_24h != null && (
                    <span className={`asset-pct ${selectedAsset.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
                      {selectedAsset.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(selectedAsset.price_change_percentage_24h).toFixed(2)}% (24h)
                    </span>
                  )}
                </div>
              </div>
              <div className="asset-actions">
                <button className="watch-btn" onClick={() => addToWatchlist(selectedAsset)}>⭐ Watchlist</button>
              </div>
            </div>

            {watchMsg && <div className="watch-msg">{watchMsg}</div>}

            {selectedAsset.type !== 'livestock' && (
              <div className="time-btns">
                {TIME_RANGES.map(r => (
                  <button key={r} className={timeRange === r ? 'active' : ''} onClick={() => setTimeRange(r)}>
                    {RANGE_LABELS[r]}
                  </button>
                ))}
              </div>
            )}

            <div className="chart-container">
              {chartLoading ? (
                <div className="chart-loading"><div className="spinner" />Loading chart...</div>
              ) : (
                <PriceChart data={chartData} days={timeRange} />
              )}
            </div>

            {selectedAsset.market_cap && (
              <div className="asset-stats-row">
                <div className="asset-stat">
                  <span>Market Cap</span>
                  <strong className="mono">${(selectedAsset.market_cap / 1e9).toFixed(2)}B</strong>
                </div>
                <div className="asset-stat">
                  <span>24h Change</span>
                  <strong className={selectedAsset.price_change_percentage_24h >= 0 ? 'up' : 'down'}>
                    {selectedAsset.price_change_percentage_24h?.toFixed(2)}%
                  </strong>
                </div>
                <div className="asset-stat">
                  <span>Type</span>
                  <strong>{selectedAsset.type === 'livestock' ? 'Livestock' : 'Cryptocurrency'}</strong>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="no-asset">Select an asset to view details</div>
        )}
      </div>
    </div>
  );
}
