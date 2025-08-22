# auth/crud.py
from typing import Optional

from passlib.context import CryptContext
from .models import User

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_pwd(p):
    return pwd_ctx.hash(p)


def verify_pwd(p, h):
    return pwd_ctx.verify(p, h)


async def get_user_by_username(username: str) -> Optional[User]:
    return await User.find_one(User.username == username)


async def get_user_by_fid(fid: str) -> Optional[User]:
    return await User.find_one(User.fid == fid)


async def create_user(username: str, password: str) -> User:
    user = User(username=username, password_hash=hash_pwd(password))
    await user.insert()
    return user


async def update_user(fid: str, **kwargs):
    user = await User.find_one(User.fid == fid)
    if not user:
        return None
    await user.update({"$set": kwargs})
