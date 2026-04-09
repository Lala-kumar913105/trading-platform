from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class PaperWallet(Base):
    __tablename__ = "paper_wallets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    balance: Mapped[Decimal] = mapped_column(Numeric(18, 2), default=Decimal("10000.00"), nullable=False)
    currency: Mapped[str] = mapped_column(String(10), default="USDT", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="paper_wallet")
