from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class ExchangeAccount(Base):
    __tablename__ = "exchange_accounts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    exchange_name: Mapped[str] = mapped_column(String(50), default="binance", nullable=False)
    api_key_encrypted: Mapped[str] = mapped_column(String(255), nullable=False)
    api_secret_encrypted: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="exchange_account")
