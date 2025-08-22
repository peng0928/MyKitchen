# auth/deps.py
import os
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from .crud import get_user_by_username, get_user_by_fid
from .models import User
from datetime import datetime, timedelta

SECRET_KEY = os.getenv("SECRET_KEY", "change_me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["demo"]


async def init_db():
    await init_beanie(database=db, document_models=[User])


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


import time
from datetime import datetime, timezone


async def get_current(token: str = Depends(oauth2_scheme)) -> User:
    cred_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token",
        headers={"Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # 1. 校验 exp
        exp = payload.get("exp")
        if exp is None or datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(timezone.utc):
            raise cred_exc

        fid: str = payload.get("fid")
        if fid is None:
            raise cred_exc
    except JWTError:
        raise cred_exc

    user = await get_user_by_fid(fid)
    if not user:
        raise cred_exc
    return user
