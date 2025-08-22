# auth/router.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from auth import schemas, crud, deps
from auth.crud import hash_pwd

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.Token)
async def register(user: schemas.UserCreate):
    if await crud.get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="User already exists")
    await crud.create_user(user.username, user.password)
    token = deps.create_access_token({"sub": user.username})
    return {"access_token": token}


@router.post("/login", response_model=schemas.Token)
async def login(user: schemas.UserCreate):
    user_info = await crud.get_user_by_username(user.username)
    if not user_info or not crud.verify_pwd(user.password, user_info.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = deps.create_access_token(
        {"sub": user.username, "fid": user_info.fid},
        expires_delta=deps.timedelta(minutes=deps.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": token, }


@router.post("/logout")
async def logout():
    return {"msg": "Logged out. Please delete token on client side."}


# auth/router.py
@router.get("/me", response_model=schemas.UserOut)
async def read_me(user: deps.User = Depends(deps.get_current)):
    user_info = await crud.get_user_by_username(user.username)
    return user_info
