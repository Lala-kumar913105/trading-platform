from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.trade import TradeActionResponse, TradeRequest, TradeResponse
from app.services.paper_trade_service import execute_paper_buy, execute_paper_sell, get_paper_history

router = APIRouter()


@router.post("/buy", response_model=TradeActionResponse)
def paper_buy(
    payload: TradeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TradeActionResponse:
    trade, updated_balance = execute_paper_buy(db, current_user, payload)
    return TradeActionResponse(
        message="Paper buy order executed successfully",
        trade=TradeResponse.model_validate(trade),
        updated_balance=updated_balance,
    )


@router.post("/sell", response_model=TradeActionResponse)
def paper_sell(
    payload: TradeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TradeActionResponse:
    trade, updated_balance = execute_paper_sell(db, current_user, payload)
    return TradeActionResponse(
        message="Paper sell order executed successfully",
        trade=TradeResponse.model_validate(trade),
        updated_balance=updated_balance,
    )


@router.get("/history", response_model=list[TradeResponse])
def paper_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TradeResponse]:
    trades = get_paper_history(db, current_user)
    return [TradeResponse.model_validate(trade) for trade in trades]
