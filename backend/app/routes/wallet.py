from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.paper_wallet import PaperWallet
from app.models.user import User
from app.schemas.wallet import WalletResponse

router = APIRouter()


@router.get("/paper", response_model=WalletResponse)
def get_paper_wallet(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> WalletResponse:
    wallet = db.query(PaperWallet).filter(PaperWallet.user_id == current_user.id).first()
    if not wallet:
        wallet = PaperWallet(user_id=current_user.id, balance=Decimal("10000.00"), currency="USDT")
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
    return WalletResponse.model_validate(wallet)
