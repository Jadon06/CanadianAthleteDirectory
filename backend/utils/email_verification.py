import smtplib, ssl
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from pydantic import EmailStr
from email.message import EmailMessage
from jose import jwt
from .. import schemas

load_dotenv()

PASSWORD = os.getenv("PASSWORD")
EMAIL = os.getenv("EMAIL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES"))

context = ssl.create_default_context()

def verification_token(payload: dict):
    expire = datetime.utcnow() + timedelta(minutes=EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES)
    payload['exp'] = expire
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token
    
def verify_token(token: str, credentials_exception):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    token_email: EmailStr = payload.get("email")

    if not token_email or not token_email:
        raise credentials_exception
    token_data = schemas.VerificationTokenData(email=token_email)
    return token_data

def send_verification_email(recipient: EmailStr, access_token: str):
    em = EmailMessage()
    em['From'] = EMAIL
    em['To'] = recipient
    em['Subject'] = 'verification link'
    em.set_content(f"your verification link expires in 30 minutes\n http://localhost:5173/verifyandcreate/{access_token}")

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        print(PASSWORD)
        smtp.login(EMAIL, PASSWORD)
        smtp.sendmail(EMAIL, recipient, em.as_string())