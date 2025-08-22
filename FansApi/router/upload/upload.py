# router/upload/upload.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from auth import schemas, crud, deps
from auth.crud import hash_pwd

router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("/avatar", response_model=schemas.Avatar)
async def upload_avatar(avatar: schemas.Avatar):
    return {"avatar_url":""}
