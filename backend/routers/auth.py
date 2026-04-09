from fastapi import APIRouter, Depends, status, HTTPException, Response, Request
from .. import models, utils, schemas, oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..utils import auth_helpers, email_verification

router = APIRouter(tags=["Authentication"])

@router.post("/login") #,response_model=schemas.Token)
async def login(response: Response, user_credentials: OAuth2PasswordRequestForm = Depends()):
    print(user_credentials)
    user = await models.users.find_one(models.users.email == user_credentials.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    if not auth_helpers.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    # create a token
    # return the token for login
    access_token = oauth2.create_acess_token(data={"email" : user.email, "full_name" : user.full_name, "id" : user.id})
    auth_helpers.set_cookie(response, access_token)
    return {"log in success"}

@router.get("/get-cookie-value")
def get_cookie(request: Request):
    token = request.cookies.get("session_token")
    if token:
        return token
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cookie not found!")

@router.post("/login/{token}")
async def verify_and_create_user(data: schemas.userBuild, response: Response, token: str):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
                                          headers={"WWW-Authenticate" : "Bearer"})
    token_data = email_verification.verify_token(token, credentials_exception)
    pending = models.pending_users.find(models.pending_users.email == token_data.email).first()
    if not pending:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Pending user not found!!")
    new_user = models.users(**pending.dict(), **data.dict())
    print(data.dict())
    await models.users.insert(new_user)
    return new_user
