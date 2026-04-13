from dotenv import load_dotenv
import os

from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .. import models

load_dotenv()

def resolve_postgres_url() -> str:
    postgres_url = os.getenv("POSTGRES_URL")
    if not postgres_url:
        raise RuntimeError("POSTGRES_URL is not set")

    docker_host = os.getenv("POSTGRES_DOCKER_HOST")
    parsed = make_url(postgres_url)

    # Correct common typo where localhost is accidentally used as DB username.
    if parsed.username in {"127.0.0.1", "localhost"}:
        env_user = os.getenv("POSTGRES_USER")
        if env_user:
            parsed = parsed.set(username=env_user)

    if docker_host and parsed.host in {"127.0.0.1", "localhost"}:
        parsed = parsed.set(host=docker_host)

    env_password = os.getenv("POSTGRES_PASSWORD")
    if env_password and parsed.password is None:
        parsed = parsed.set(password=env_password)

    env_db = os.getenv("POSTGRES_DB")
    if env_db and not parsed.database:
        parsed = parsed.set(database=env_db)

    return parsed.render_as_string(hide_password=False)


POSTGRES_URL = resolve_postgres_url()

engine = create_engine(POSTGRES_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# returns a new base class for declarative models 
# all ORM models must inherit from the 'Base' class
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()