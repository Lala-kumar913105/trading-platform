"""API route modules."""

from app.routes import auth, exchange, paper_trading, real_trading, wallet

__all__ = ["auth", "wallet", "paper_trading", "real_trading", "exchange"]
