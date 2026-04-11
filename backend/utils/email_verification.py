import smtplib, ssl
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from pydantic import EmailStr
from email.message import EmailMessage
from jose import jwt
from .. import schemas

load_dotenv()

APP_PASSWORD = os.getenv("APP_PASSWORD")
EMAIL = os.getenv("EMAIL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES"))
FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:5173").rstrip("/")

context = ssl.create_default_context()

def verification_token(payload: dict):
    expire = datetime.utcnow() + timedelta(minutes=EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES)
    payload['exp'] = expire
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token
    
def verify_token(token: str, credentials_exception):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    token_email: EmailStr = payload.get("email")
    token_login_time: bool = payload.get("first_time_login")

    if not token_email or not token_email:
        raise credentials_exception
    token_data = schemas.VerificationTokenData(email=token_email, token_login_time=token_login_time)
    return token_data

def send_verification_email(recipient: EmailStr, access_token: str):
    em = EmailMessage()
    em['From'] = EMAIL
    em['To'] = recipient
    em['Subject'] = 'verification link'
    em.set_content(
        f"your verification link expires in 30 minutes\n "
        f"{FRONTEND_BASE_URL}/verifyandcreate/{access_token}"
    )

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(EMAIL, APP_PASSWORD)
        smtp.sendmail(EMAIL, recipient, em.as_string())