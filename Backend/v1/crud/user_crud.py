from sqlalchemy.orm import Session
import pymysql
from database.models import User
from v1.schemas.schemas import UserCreate
from v1.utils.security import get_password_hash


def create_user(db: Session, user: UserCreate):
    try:
        db_user = User(
            username=user.username,
            # user.hashed_password currently contains the plain password
            # (naming is awkward in the repo). Hash it consistently using
            # the shared utility.
            hashed_password=get_password_hash(user.hashed_password)
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except pymysql.IntegrityError:
        db.rollback()
        raise ValueError("Username or email already exists")
    except Exception as e:
        db.rollback()
        raise e

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_me(db: Session, username: str, userid: int):
    try:
        # Fetch the user by username and userid
        user = db.query(User).filter(User.username == username, User.id == userid).first()
        if not user:
            return None  # User not found
        return user
    except Exception as e:
        # Log the error here
        print(f"Unexpected error occurred: {e}")
        return None


def get_all_users(db: Session):
    """Return all users from the database as a list of User objects."""
    try:
        return db.query(User).all()
    except Exception as e:
        print(f"Error fetching all users: {e}")
        return []
