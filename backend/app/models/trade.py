from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Trade(Base):
    __tablename__ = "trades"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    mode: Mapped[str] = mapped_column(String(20), index=True)  # PAPER or REAL
    symbol: Mapped[str] = mapped_column(String(30), nullable=False)
    side: Mapped[str] = mapped_column(String(10), nullable=False)  # BUY or SELL
    quantity: Mapped[Decimal] = mapped_column(Numeric(18, 8), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(18, 8), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="FILLED", nullable=False)
    pnl: Mapped[Decimal] = mapped_column(Numeric(18, 2), default=Decimal("0.00"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="trades")
