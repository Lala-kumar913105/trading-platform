from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class WalletResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    balance: Decimal
    currency: str
