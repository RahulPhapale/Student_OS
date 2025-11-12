# app/models.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# class Item(Base):
#     __tablename__ = "items"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(255), index=True)  # Specify length for VARCHAR
#     description = Column(String(255))  # Specify length for VARCHAR
#     price = Column(Integer)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    hashed_password = Column(String(100), nullable=False)
