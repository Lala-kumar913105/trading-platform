from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.exchange import ExchangeConnectRequest, ExchangeStatusResponse
from app.services.exchange_service import connect_exchange, get_exchange_status

router = APIRouter()


@router.post("/connect", response_model=ExchangeStatusResponse)
def connect(
    payload: ExchangeConnectRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ExchangeStatusResponse:
    account = connect_exchange(db, current_user, payload)
    return ExchangeStatusResponse(
        exchange_name=account.exchange_name,
        is_active=account.is_active,
        message="Exchange account saved successfully. Real trading remains disabled by default.",
    )


@router.get("/status", response_model=ExchangeStatusResponse)
def status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ExchangeStatusResponse:
    account = get_exchange_status(db, current_user)
    if not account:
        return ExchangeStatusResponse(
            exchange_name=None,
            is_active=False,
            message="No exchange connected yet.",
        )

    return ExchangeStatusResponse(
        exchange_name=account.exchange_name,
        is_active=account.is_active,
        message="Exchange connected.",
    )
