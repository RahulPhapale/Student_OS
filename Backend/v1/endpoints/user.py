from typing import List
from fastapi import APIRouter, HTTPException
from v1.crud.user_crud import create_user, get_all_users
from v1.schemas.schemas import User, UserCreate
from fastapi import Depends
from sqlalchemy.orm import Session
from dbsession import get_db

app = APIRouter()


@app.post("/users_create_user/", response_model=User)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


@app.get("/users/", response_model=List[User])
def get_users_endpoint(db: Session = Depends(get_db)):
    """Return all users in the database."""
    users = get_all_users(db)
    return users