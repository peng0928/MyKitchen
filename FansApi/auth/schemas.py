# auth/schemas.py
from pydantic import BaseModel

class Fid(BaseModel):
    fid: str

class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    fid: str = "bearer"


class UserOut(BaseModel):
    username: str
    fid: str
    name: str
    desc: str
    avatar_url: str
    create_time: str


class Avatar(BaseModel):
    avatar_url: str
