import smtplib, ssl
import os
from dotenv import load_dotenv
from .. import schemas
from pydantic import EmailStr
import random

load_dotenv()

port = 465
password = os.getenv("PASSWORD")

context = ssl.create_default_context()

def verification_code():
    return random.randint(10000, 99999)

def verify_code(entered: int, sent: int):
    if entered != sent:
        return False
    return True

def send_verification_email(recipient: EmailStr, code: int, sender_email = "noreplynorhternathletes@gmail.com"):
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login("noreplynorhternathletes@gmail.com", password)
    message = f"your verification code is: {verification_code}"
    server.sendmail(sender_email, recipient, message)