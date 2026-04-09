from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.models import exchange_account, paper_wallet, trade, user  # noqa: F401
from app.routes import auth, exchange, paper_trading, real_trading, wallet


# Create database tables on startup for starter project simplicity.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Trading Platform API",
    version="1.0.0",
    description="Starter backend for paper + real trading architecture",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["System"])
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/", tags=["System"])
def root() -> dict:
    return {"message": "Trading Platform API is running", "status": "ok"}


app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(wallet.router, prefix="/api/wallet", tags=["Wallet"])
app.include_router(paper_trading.router, prefix="/api/paper-trade", tags=["Paper Trading"])
app.include_router(real_trading.router, prefix="/api/real-trade", tags=["Real Trading"])
app.include_router(exchange.router, prefix="/api/exchange", tags=["Exchange"])
