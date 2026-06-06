import React from 'react';
import MarketDashboard from '../components/MarketDashboard';
import WatchlistPage from '../components/WatchlistPage';
import PortfolioPage from '../components/PortfolioPage';
import AlertsPage from '../components/AlertsPage';
import NewsPage from '../components/NewsPage';
import './Dashboard.css';

export default function Dashboard({ page, setPage, openAuth }) {
  return (
    <div className="dashboard-wrap">
      {page === 'dashboard' && <MarketDashboard setPage={setPage} openAuth={openAuth} />}
      {page === 'watchlist' && <WatchlistPage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'alerts' && <AlertsPage />}
      {page === 'news' && <NewsPage />}
    </div>
  );
}
