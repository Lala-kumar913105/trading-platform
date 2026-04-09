from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class TradeRequest(BaseModel):
    symbol: str = Field(min_length=2, max_length=30)
    quantity: Decimal = Field(gt=0)
    price: Decimal = Field(gt=0)


class TradeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    mode: Literal["PAPER", "REAL"]
    symbol: str
    side: Literal["BUY", "SELL"]
    quantity: Decimal
    price: Decimal
    status: str
    pnl: Decimal
    created_at: datetime


class TradeActionResponse(BaseModel):
    message: str
    trade: TradeResponse
    updated_balance: Decimal | None = None


class RealTradeResponse(BaseModel):
    message: str
    mode: str
    integration_ready: bool
    requested_order: dict
