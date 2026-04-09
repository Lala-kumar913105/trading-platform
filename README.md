# trading-platform

Beginner-friendly full-stack starter for a trading website with:

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend:** FastAPI + SQLAlchemy + JWT auth
- **Database:** PostgreSQL (with quick SQLite fallback option)
- **Modes:** Paper Trading (working) + Real Trading (safe scaffold, disabled by default)

---

## 1) Project Structure

```txt
trading-platform/
  backend/
    .env.example
    requirements.txt
    app/
      __init__.py
      main.py
      core/
        __init__.py
        config.py
        database.py
        security.py
      models/
        __init__.py
        user.py
        paper_wallet.py
        trade.py
        exchange_account.py
      schemas/
        __init__.py
        auth.py
        user.py
        trade.py
        wallet.py
        exchange.py
      routes/
        __init__.py
        auth.py
        wallet.py
        paper_trading.py
        real_trading.py
        exchange.py
      services/
        __init__.py
        paper_trade_service.py
        real_trade_service.py
        exchange_service.py
  frontend/
    .env.local.example
    package.json
    tsconfig.json
    next-env.d.ts
    next.config.mjs
    postcss.config.js
    tailwind.config.ts
    middleware.ts
    app/
      globals.css
      layout.tsx
      page.tsx
      login/page.tsx
      signup/page.tsx
      dashboard/page.tsx
      trade/page.tsx
      history/page.tsx
      settings/exchange/page.tsx
    components/
      Navbar.tsx
      ModeToggle.tsx
      WalletCard.tsx
      TradeForm.tsx
      TradeHistoryTable.tsx
    lib/
      api.ts
      auth.ts
      types.ts
  README.md
```

---

## 2) Backend Setup (FastAPI)

### Prerequisites

- Python 3.10+
- PostgreSQL running locally

### Create PostgreSQL DB (example)

```bash
sudo -u postgres psql -c "CREATE DATABASE trading_platform;"
```

### Install and run backend

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`

---

## 3) Frontend Setup (Next.js)

### Install and run frontend

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 4) Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/trading_platform
SECRET_KEY=change-this-to-a-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120
CORS_ORIGINS=http://localhost:3000
ENABLE_REAL_TRADING=false
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 5) Implemented Features

- Signup/Login with JWT token
- Protected backend routes with `Authorization: Bearer <token>`
- Frontend route protection via `middleware.ts` (cookie check)
- Auto-created **paper wallet (10000 USDT)** on signup
- Paper trading buy/sell + balance updates
- Paper and real trade history endpoints
- Real trading endpoints are scaffolded and safe (no live order placement)
- Exchange connect/status endpoints for future Binance key workflow
- Dark responsive UI with dashboard, trade form, history table, and exchange settings
- TradingView widget embedded on trade page

---

## 6) API Routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Wallet

- `GET /api/wallet/paper`

### Paper Trading

- `POST /api/paper-trade/buy`
- `POST /api/paper-trade/sell`
- `GET /api/paper-trade/history`

### Real Trading (safe scaffold)

- `POST /api/real-trade/buy`
- `POST /api/real-trade/sell`
- `GET /api/real-trade/history`

### Exchange

- `POST /api/exchange/connect`
- `GET /api/exchange/status`

---

## 7) Temporary SQLite Switch (for quick testing)

If PostgreSQL is not available, edit `backend/.env`:

```env
DATABASE_URL=sqlite:///./trading_platform.db
```

Then run backend again:

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

> Note: SQLite is great for local testing, but use PostgreSQL for realistic multi-user behavior.

---

## 8) Exact Install Commands (Quick Copy)

### Backend install

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/backend && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && cp .env.example .env
```

### Frontend install

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/frontend && npm install && cp .env.local.example .env.local
```

---

## 9) Exact Run Commands

### Run backend

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/backend && source .venv/bin/activate && uvicorn app.main:app --reload
```

### Run frontend

```bash
cd /home/freefirelover/crypto-ema-bot/trading-platform/frontend && npm run dev
```

---

## 10) Next Upgrade Steps

### Live market price

1. Add price feed service (Binance public ticker or WebSocket)
2. Auto-fill latest price in trade form
3. Cache latest quotes in Redis/in-memory cache

### Binance real trading integration

1. Add Binance SDK/client in `backend/app/services/real_trade_service.py`
2. Add secure API key encryption (replace base64 with proper encryption)
3. Respect `ENABLE_REAL_TRADING=true` gate
4. Add dry-run and sandbox mode before production

### Bot trading

1. Add `strategies/` module (EMA/RSI starter)
2. Add scheduler/worker (Celery/APScheduler)
3. Add trade risk limits (max daily loss, max position size)

### PnL improvement

1. Track positions per symbol
2. Calculate realized/unrealized PnL
3. Add fees/slippage support

### Chart improvements

1. Make chart symbol sync with input symbol
2. Add timeframe selector
3. Overlay trades on chart with annotations

---

## 11) Final Verification Checklist

- [x] Backend and frontend folder structure created
- [x] All requested backend routes implemented
- [x] JWT auth + protected routes implemented
- [x] Paper wallet seeded at signup (10000 USDT)
- [x] Paper trading buy/sell/history implemented
- [x] Real trading scaffold implemented and safe by default
- [x] Exchange connect/status pages and APIs implemented
- [x] Next.js pages created (`/`, `/login`, `/signup`, `/dashboard`, `/trade`, `/history`, `/settings/exchange`)
- [x] TradingView widget added on trade page
- [x] Environment variable examples included
- [x] PostgreSQL setup provided
- [x] SQLite fallback instructions provided
