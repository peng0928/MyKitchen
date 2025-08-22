from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from auth import schemas, crud, deps
from auth.crud import hash_pwd

router = APIRouter(prefix="/user", tags=["user"])


@router.post("/update")
async def update(item: dict, user: deps.User = Depends(deps.get_current)):
    await crud.update_user(user.fid, **item)
    return JSONResponse({"code": 200, "msg": "更新成功"})
