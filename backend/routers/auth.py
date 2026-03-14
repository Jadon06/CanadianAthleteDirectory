from fastapi import APIRouter, Depends, status, HTTPException, Response
from .. import models, utils, schemas, oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..utils import auth_helpers, email_verification

router = APIRouter(tags=["Authentication"])

@router.post("/login", response_model=schemas.Token)
async def login(response: Response, user_credentials: OAuth2PasswordRequestForm = Depends()):
    user = await models.users.find_one(models.users.email == user_credentials.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    if not auth_helpers.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    # create a token
    # return the token for login
    access_token = oauth2.create_acess_token(data={"email" : user.email})
    auth_helpers.set_cookie(response, access_token)
    return {"Log in Successful"}

@router.post("/{token}")
async def verify_and_create_user(token: str):
    token_data = email_verification.verify_token(token)
    print(token_data)
    pending = models.pending_users.find(models.pending_users.email == token_data.email).first()
    if not pending:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail="Pending user not found!!")
    # if :
    #     raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
    #                          detail="verification code expired or incorrect!!")
    new_user = models.users(**pending.dict())
    await models.users.insert(new_user)
    return new_user