from fastapi import APIRouter
# from .endpoints import KMS
from .endpoints import login, user

api_router = APIRouter()
# api_router.include_router(KMS.app, prefix="/KMS", tags=["KMS"])
api_router.include_router(login.app, prefix="/auth", tags=["login"])
api_router.include_router(user.app, prefix="/user", tags=["user"])
