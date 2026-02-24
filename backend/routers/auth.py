from fastapi import APIRouter, Depends, status, HTTPException, Response
from .. import models, utils, schemas, oauth2
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from ..utils import auth_helpers

router = APIRouter(tags=["Authentication"])

@router.post("/login", response_model=schemas.Token)
async def login(user_credentials: OAuth2PasswordRequestForm = Depends()):
    user = await models.users.find_one(models.users.email == user_credentials.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    if not auth_helpers.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password!")
    # create a token
    # return the token for login
    access_token = oauth2.create_acess_token(data={"email" : user.email})
    return {"access_token" : access_token, "token_type" : "Bearer"}