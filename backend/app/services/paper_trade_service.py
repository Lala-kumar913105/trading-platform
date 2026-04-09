from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.paper_wallet import PaperWallet
from app.models.trade import Trade
from app.models.user import User
from app.schemas.trade import TradeRequest


def _get_or_create_wallet(db: Session, user: User) -> PaperWallet:
    wallet = db.query(PaperWallet).filter(PaperWallet.user_id == user.id).first()
    if not wallet:
        wallet = PaperWallet(user_id=user.id, balance=Decimal("10000.00"), currency="USDT")
        db.add(wallet)
        db.flush()
    return wallet


def execute_paper_buy(db: Session, user: User, payload: TradeRequest) -> tuple[Trade, Decimal]:
    wallet = _get_or_create_wallet(db, user)
    total_cost = payload.quantity * payload.price

    if wallet.balance < total_cost:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient paper wallet balance",
        )

    wallet.balance = wallet.balance - total_cost

    trade = Trade(
        user_id=user.id,
        mode="PAPER",
        symbol=payload.symbol.upper(),
        side="BUY",
        quantity=payload.quantity,
        price=payload.price,
        status="FILLED",
        pnl=Decimal("0.00"),
    )
    db.add(trade)
    db.commit()
    db.refresh(trade)
    db.refresh(wallet)
    return trade, wallet.balance


def execute_paper_sell(db: Session, user: User, payload: TradeRequest) -> tuple[Trade, Decimal]:
    wallet = _get_or_create_wallet(db, user)
    total_value = payload.quantity * payload.price
    wallet.balance = wallet.balance + total_value

    trade = Trade(
        user_id=user.id,
        mode="PAPER",
        symbol=payload.symbol.upper(),
        side="SELL",
        quantity=payload.quantity,
        price=payload.price,
        status="FILLED",
        pnl=Decimal("0.00"),
    )
    db.add(trade)
    db.commit()
    db.refresh(trade)
    db.refresh(wallet)
    return trade, wallet.balance


def get_paper_history(db: Session, user: User) -> list[Trade]:
    return (
        db.query(Trade)
        .filter(Trade.user_id == user.id, Trade.mode == "PAPER")
        .order_by(Trade.created_at.desc())
        .all()
    )
