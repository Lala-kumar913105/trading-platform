from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.trade import Trade
from app.models.user import User
from app.schemas.trade import RealTradeResponse, TradeRequest


def build_real_trade_response(side: str, payload: TradeRequest) -> RealTradeResponse:
    """Return safe structured response without placing real orders."""
    return RealTradeResponse(
        message=(
            "Real trading integration is ready but disabled by default. "
            "Enable and integrate Binance execution in app/services/real_trade_service.py"
        ),
        mode="REAL",
        integration_ready=True,
        requested_order={
            "side": side,
            "symbol": payload.symbol.upper(),
            "quantity": str(payload.quantity),
            "price": str(payload.price),
            "enabled": settings.enable_real_trading,
        },
    )


def get_real_trade_history(db: Session, user: User) -> list[Trade]:
    return (
        db.query(Trade)
        .filter(Trade.user_id == user.id, Trade.mode == "REAL")
        .order_by(Trade.created_at.desc())
        .all()
    )
