from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.trade import RealTradeResponse, TradeRequest, TradeResponse
from app.services.real_trade_service import build_real_trade_response, get_real_trade_history

router = APIRouter()


@router.post("/buy", response_model=RealTradeResponse)
def real_buy(
    payload: TradeRequest,
    current_user: User = Depends(get_current_user),
) -> RealTradeResponse:
    # current_user dependency ensures route is protected.
    _ = current_user
    return build_real_trade_response("BUY", payload)


@router.post("/sell", response_model=RealTradeResponse)
def real_sell(
    payload: TradeRequest,
    current_user: User = Depends(get_current_user),
) -> RealTradeResponse:
    _ = current_user
    return build_real_trade_response("SELL", payload)


@router.get("/history", response_model=list[TradeResponse])
def real_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TradeResponse]:
    trades = get_real_trade_history(db, current_user)
    return [TradeResponse.model_validate(trade) for trade in trades]
