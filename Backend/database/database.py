# from sqlalchemy import create_engine 
# from sqlalchemy.ext.declarative import declarative_base 
# from sqlalchemy.orm import sessionmaker
 
# # MySQL database URL
# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Rahul1109!@localhost:3306/sample_database"
 
# # Create the engine without the check_same_thread argument
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL
# )
 
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
 
# Base = declarative_base()



import os
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from database.models import Base
# from v1.crud import defaultfunc_crud

DEFAULT_USER = 'root'
DEFAULT_PASSWORD = 'Rahul1109!'
DEFAULT_HOST = 'localhost'
DEFAULT_DATABASE = 'license_database'
 
DATABASE_USER = os.getenv('DATABASE_USER', DEFAULT_USER)
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', DEFAULT_PASSWORD)
DATABASE_HOST = os.getenv('DATABASE_HOST', DEFAULT_HOST)
DATABASE_NAME = os.getenv('DATABASE_NAME', DEFAULT_DATABASE)

def getconnection():
    SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return SessionLocal, engine

def create_tables(engine):
    Base.metadata.create_all(bind=engine)
    # defaultfunc_crud.insert_initial_data(engine)
