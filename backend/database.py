from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# Default to a local postgres database called 'scribe' if not specified
# User might need to run: createdb scribe
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost/scribe")

# If using SQLite for fallback (uncomment if needed, but plan specified Postgres)
# SQLALCHEMY_DATABASE_URL = "sqlite:///./scribe.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
