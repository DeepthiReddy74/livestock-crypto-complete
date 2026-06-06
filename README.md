# 🐄💰 Livestock Crypto — Full Stack Crypto Tracker

A full-stack web application that lets users **track cryptocurrency prices**, manage a **watchlist & portfolio**, receive **price alerts**, and stay updated with the latest **crypto news** — all in one place.

---

## 🚀 Live Features

| Feature | Description |
|---|---|
| 📊 **Market Dashboard** | Real-time crypto market overview with prices and trends |
| 👀 **Watchlist** | Save and monitor your favourite cryptocurrencies |
| 💼 **Portfolio** | Track your holdings and overall portfolio value |
| 🔔 **Price Alerts** | Get notified when a coin hits your target price |
| 📰 **News Feed** | Latest crypto news and market updates |
| 🔐 **Authentication** | Secure user login and registration system |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI
- **React Router** — Page navigation
- **Context API** — Global state management (Auth)
- **CSS Modules** — Component-scoped styling
- **Axios / Fetch** — API calls

### Backend
- **Node.js** — Runtime environment
- **Express.js** — REST API framework
- **JWT** — Authentication tokens
- **REST APIs** — Crypto data integration

---

## 📁 Project Structure

```
livestock-crypto-complete/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── MarketDashboard.js
│       │   ├── WatchlistPage.js
│       │   ├── PortfolioPage.js
│       │   ├── PriceChart.js
│       │   ├── AlertsPage.js
│       │   ├── NewsPage.js
│       │   ├── Navbar.js
│       │   └── AuthModal.js
│       ├── pages/
│       │   ├── Landing.js
│       │   └── Dashboard.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       └── index.js
│
└── backend/
    ├── routes/
    ├── controllers/
    ├── models/
    └── server.js
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or above)
- npm (comes with Node.js)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/DeepthiReddy74/livestock-crypto-complete.git
cd livestock-crypto-complete
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CRYPTO_API_KEY=your_crypto_api_key
```

Start the backend server:

```bash
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Setup Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CRYPTO_API_KEY` | API key for crypto price data |

> ⚠️ Never commit your `.env` file to GitHub!

---

## 📸 Pages Overview

- **Landing Page** — Introduction and login/signup
- **Dashboard** — Main app after login
- **Market Dashboard** — Live crypto prices
- **Watchlist** — Your saved coins
- **Portfolio** — Your holdings tracker
- **Alerts** — Set price notifications
- **News** — Latest crypto headlines

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Deepthi Reddy**
- GitHub: [@DeepthiReddy74](https://github.com/DeepthiReddy74)
- LinkedIn: [Deepthi Reddy](https://www.linkedin.com/in/deepthi-reddy-2641253a0/)
- Email: reddydeepthi68699@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ as a Full Stack Development project
