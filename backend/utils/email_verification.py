import smtplib, ssl
import os
from dotenv import load_dotenv
import mimetypes
from pydantic import EmailStr
import random
from email.message import EmailMessage

load_dotenv()

password = os.getenv("PASSWORD")
email = os.getenv("EMAIL")

context = ssl.create_default_context()

def verification_code():
    return random.randint(10000, 99999)

def send_verification_email(recipient: EmailStr, code: int):
    em = EmailMessage()
    em['From'] = email
    em['To'] = recipient
    em['Subject'] = f'verification code {code}'

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email, password)
        smtp.sendmail(email, recipient, em.as_string())