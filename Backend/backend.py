import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from v1.routes import api_router
import database.database as db
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from threading import Thread, Event
# from starlette.middleware.sessions import SessionMiddleware

origins = [
    "http://localhost:3000",  # React frontend
    "http://localhost:5173",  # React frontend
]

app = FastAPI(root_path="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)

SECRET_KEY = "09d25e094faa6ca2556c818166b7239563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

API_PORT = int(os.getenv('API_PORT', 8000))
session = None
session, engine = db.getconnection()
db.create_tables(engine)
