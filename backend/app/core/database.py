from collections.abc import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, declarative_base, sessionmaker

from app.core.config import settings


database_url = settings.database_url
if database_url.startswith("postgres://"):
    # Support legacy URL format used by some local setups.
    database_url = database_url.replace("postgres://", "postgresql://", 1)

engine_kwargs = {"pool_pre_ping": True}
if database_url.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(database_url, **engine_kwargs)

# If PostgreSQL is configured but unavailable locally, fallback to SQLite
# so the project can start for local development.
if not database_url.startswith("sqlite"):
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError:
        fallback_url = "sqlite:///./trading_platform.db"
        engine = create_engine(
            fallback_url,
            pool_pre_ping=True,
            connect_args={"check_same_thread": False},
        )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency to provide a SQLAlchemy session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
