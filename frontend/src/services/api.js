import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 12000,
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('cl_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

API.interceptors.response.use(
  r => r,
  err => Promise.reject(err.response?.data?.message || err.message || 'Error')
);

// ── Auth ──
export const authApi = {
  register: d => API.post('/auth/register', d),
  login: d => API.post('/auth/login', d),
  me: () => API.get('/auth/me'),
};

// ── Market (CoinGecko proxy) ──
export const marketApi = {
  search: q => API.get('/market/search', { params: { query: q } }),
  prices: ids => API.get('/market/prices', { params: { ids, vs_currency: 'usd' } }),
  chart: (id, days) => API.get(`/market/chart/${id}`, { params: { days } }),
  trending: () => API.get('/market/trending'),
  global: () => API.get('/market/global'),
};

// ── Watchlist ──
export const watchlistApi = {
  getAll: () => API.get('/watchlist'),
  add: d => API.post('/watchlist', d),
  remove: symbol => API.delete(`/watchlist/${symbol}`),
};

// ── Portfolio ──
export const portfolioApi = {
  getAll: () => API.get('/portfolio'),
  add: d => API.post('/portfolio', d),
  remove: id => API.delete(`/portfolio/${id}`),
};

// ── Alerts ──
export const alertsApi = {
  getAll: () => API.get('/alerts'),
  create: d => API.post('/alerts', d),
  remove: id => API.delete(`/alerts/${id}`),
};

// ── News ──
export const newsApi = {
  getAll: () => API.get('/news'),
};

export default API;
