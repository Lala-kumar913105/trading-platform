import base64

from sqlalchemy.orm import Session

from app.models.exchange_account import ExchangeAccount
from app.models.user import User
from app.schemas.exchange import ExchangeConnectRequest


def _simple_encrypt(value: str) -> str:
    """Starter obfuscation for local dev. Replace with real encryption later."""
    return base64.b64encode(value.encode("utf-8")).decode("utf-8")


def connect_exchange(db: Session, user: User, payload: ExchangeConnectRequest) -> ExchangeAccount:
    account = db.query(ExchangeAccount).filter(ExchangeAccount.user_id == user.id).first()
    encrypted_key = _simple_encrypt(payload.api_key)
    encrypted_secret = _simple_encrypt(payload.api_secret)

    if account:
        account.exchange_name = payload.exchange_name.lower()
        account.api_key_encrypted = encrypted_key
        account.api_secret_encrypted = encrypted_secret
        account.is_active = True
    else:
        account = ExchangeAccount(
            user_id=user.id,
            exchange_name=payload.exchange_name.lower(),
            api_key_encrypted=encrypted_key,
            api_secret_encrypted=encrypted_secret,
            is_active=True,
        )
        db.add(account)

    db.commit()
    db.refresh(account)
    return account


def get_exchange_status(db: Session, user: User) -> ExchangeAccount | None:
    return db.query(ExchangeAccount).filter(ExchangeAccount.user_id == user.id).first()
