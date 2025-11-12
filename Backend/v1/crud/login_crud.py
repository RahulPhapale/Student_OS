from typing import Annotated, List
from fastapi import HTTPException, WebSocket
from v1.crud.user_crud import get_user_by_username
from fastapi import Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from v1.schemas.schemas import UserBase
from v1.schemas.schemas import TokenData
from v1.utils.security import verify_password, get_password_hash, needs_rehash

SECRET_KEY = "09d25e094faa6ca2556c818166b7239563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth")


# Functions for password verification, user authentication, and JWT token creation
def authenticate_user(db, username: str, password: str):
    """Authenticate a user using the provided DB session.

    If authentication succeeds and the stored hash is outdated, re-hash the
    password with the preferred scheme and update the DB so future verifies
    use the stronger/default scheme.
    """
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False

    # Upgrade hash to preferred scheme transparently on successful login
    try:
        if needs_rehash(user.hashed_password):
            user.hashed_password = get_password_hash(password)
            db.add(user)
            db.commit()
            db.refresh(user)
    except Exception:
        # Fail-safe: don't block login if rehashing/updating DB fails.
        pass

    return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("u")
        userid: int = payload.get("id")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username, id=userid, Token=str(token))
    except JWTError:
        raise credentials_exception
    user = token_data.username
    if user is None:
        raise credentials_exception
    return token_data

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_active_user(
    current_user: Annotated[UserBase, Depends(get_current_user)]
):
    return current_user
