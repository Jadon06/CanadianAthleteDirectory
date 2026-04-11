import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from pydantic import EmailStr
from jose import jwt
from .. import schemas
import resend

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("EMAIL_ACCESS_TOKEN_EXPIRE_MINUTES"))
FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:5173").rstrip("/")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "noreply@canadianathletenetwork.app")
resend.api_key = RESEND_API_KEY

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
    if not RESEND_API_KEY:
        print("Email delivery failed: RESEND_API_KEY is not set")
        return

    verification_link = f"{FRONTEND_BASE_URL}/verifyandcreate/{access_token}"
    try:
        resend.Emails.send({
            "from": RESEND_FROM_EMAIL,
            "to": [str(recipient)],
            "subject": "Verification Link",
            "html": (
                "<p>Your verification link expires in 30 minutes.</p>"
                f"<p><a href=\"{verification_link}\">Verify your account</a></p>"
            ),
        })
        print(f"Verification email sent to {recipient}")
    except Exception as exc:
        print(f"Email delivery failed for {recipient}: {exc}")