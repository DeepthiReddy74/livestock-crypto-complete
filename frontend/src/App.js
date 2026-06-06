import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import './App.css';

function AppInner() {
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState('landing'); // landing | dashboard | portfolio | watchlist | alerts | news
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode = 'login') => { setAuthMode(mode); setAuthOpen(true); };

  const handleGetStarted = () => {
    if (isLoggedIn) setPage('dashboard');
    else openAuth('register');
  };

  return (
    <div className="app">
      {page !== 'landing' && (
        <Navbar page={page} setPage={setPage} openAuth={openAuth} />
      )}

      {page === 'landing' && (
        <Landing onGetStarted={handleGetStarted} onLogin={() => openAuth('login')} setPage={setPage} isLoggedIn={isLoggedIn} />
      )}
      {page !== 'landing' && (
        <Dashboard page={page} setPage={setPage} openAuth={openAuth} />
      )}

      {authOpen && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthOpen(false)}
          onSuccess={() => { setAuthOpen(false); setPage('dashboard'); }}
        />
      )}
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppInner /></AuthProvider>;
}
