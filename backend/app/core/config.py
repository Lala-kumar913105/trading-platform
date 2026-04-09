from pathlib import Path
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    _backend_dir = Path(__file__).resolve().parents[2]
    model_config = SettingsConfigDict(
        env_file=(str(_backend_dir / ".env"), ".env"),
        env_file_encoding="utf-8",
    )

    database_url: str = Field(default="sqlite:///./trading_platform.db", alias="DATABASE_URL")
    secret_key: str = Field(default="dev-only-change-this-secret", alias="SECRET_KEY")
    algorithm: str = Field(default="HS256", alias="ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    cors_origins_raw: str = Field(default="http://localhost:3000", alias="CORS_ORIGINS")
    enable_real_trading: bool = Field(default=False, alias="ENABLE_REAL_TRADING")

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


settings = Settings()
