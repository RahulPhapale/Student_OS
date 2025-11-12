from typing import Annotated
from fastapi import APIRouter, HTTPException
from datetime import timedelta
from fastapi import HTTPException, status
from v1.crud.user_crud import get_user_me
from v1.crud.login_crud import authenticate_user, create_access_token, get_current_active_user
from v1.schemas.schemas import UserBase

from fastapi import Depends
from sqlalchemy.orm import Session 
from dbsession import get_db
from fastapi.security import OAuth2PasswordRequestForm

app = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@app.post("")
async def token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    # Pass the DB session into authenticate_user so it can update hashes if needed
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"u": user.username, "id": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/")
async def read_users_me(
    current_user: Annotated[UserBase, Depends(get_current_active_user)], db: Session = Depends(get_db)
):
    data = get_user_me(db, current_user.username, int(current_user.id))
    return data
