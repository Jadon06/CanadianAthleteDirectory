from passlib.context import CryptContext
from fastapi import Response
from dotenv import load_dotenv
import os

load_dotenv()
ACCESS_TOKEN_EXPIRE_SECONDS = int(os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS"))

# Hashing algortihm for User password security
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash(pw: str):
    return pwd_context.hash(pw)

def verify(plain_pw: str, database_pw: str):
    return pwd_context.verify(plain_pw, database_pw)

def set_cookie(response: Response, token):
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_SECONDS, # Optional: cookie lifetime in seconds (1 hour)
        secure=False,  # Optional: ensures cookie is only sent over HTTPS in production
        samesite="lax", # Optional: helps mitigate CSRF attacks
        path="/"
    )