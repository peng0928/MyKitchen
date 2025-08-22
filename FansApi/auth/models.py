# auth/models.py
import random

from beanie import Document
from pydantic import Field, BaseModel
from utils.name_map import get_name
from utils.tools import datetime_now


class User(Document):
    username: str = Field(index=True, unique=True)
    password_hash: str
    fid: str = "FDZ" + str(random.randint(1000000, 9999999))
    name: str = get_name()
    desc: str = ""
    avatar_url: str = ""
    create_time: str = datetime_now()

    class Settings:
        name = "users"
