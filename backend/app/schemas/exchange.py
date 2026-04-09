from pydantic import BaseModel, Field


class ExchangeConnectRequest(BaseModel):
    exchange_name: str = Field(default="binance", min_length=2, max_length=50)
    api_key: str = Field(min_length=5, max_length=255)
    api_secret: str = Field(min_length=5, max_length=255)


class ExchangeStatusResponse(BaseModel):
    exchange_name: str | None = None
    is_active: bool
    message: str
