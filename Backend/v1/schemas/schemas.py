from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
	"""Basic user data used in auth dependencies and token payloads."""
	username: str
	id: int


class UserCreate(BaseModel):
	"""Incoming payload for creating a user.

	Note: the codebase currently expects the field `hashed_password` on the
	incoming object (it hashes it again before storing). To avoid changing
	existing logic, this schema keeps that name.
	"""
	username: str
	hashed_password: str


class User(BaseModel):
	"""Response model for user objects returned by endpoints.

	This intentionally excludes password fields.
	"""
	id: int
	username: str

	class Config:
		orm_mode = True


class Token(BaseModel):
	access_token: str
	token_type: str


class TokenData(BaseModel):
	"""Data stored in / returned from tokens.

	The application constructs TokenData with `username`, `id`, and `Token`.
	"""
	username: Optional[str] = None
	id: Optional[int] = None
	Token: Optional[str] = None

	class Config:
		orm_mode = True


# Backwards-compatible aliases (if other modules import different names)
__all__ = ["UserBase", "UserCreate", "User", "Token", "TokenData"]


