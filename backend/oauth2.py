from jose import JWTError, jwt
from pydantic import EmailStr
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from . import schemas, database, models
import os
from dotenv import load_dotenv

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

load_dotenv()
# Secret Key
# Algorithm for encrypting token
# expiration time

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

def create_acess_token(data: dict):
    payload = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expire})

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_access_token(token: str, credentials_exception):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    token_email: EmailStr = payload.get("email")

    if not token_email or not token_email:
        raise credentials_exception
    token_data = schemas.TokenData(email=token_email)
    return token_data

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
                                          headers={"WWW-Authenticate" : "Bearer"})
    token_info = verify_access_token(token, credentials_exception)
    user = await models.users.find_one(models.users.email == token_info.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email does not exist")
    return user