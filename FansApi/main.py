# main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from router.router import router as auth_router
from router.user.api import router as user_router
from router.upload.upload import router as upload_router
from auth.deps import init_db
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()  # 建库 / 建索引
    yield


app = FastAPI(title="FastAPI + MongoDB Auth Demo", lifespan=lifespan)

# main.py

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境换成小程序域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(user_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=12025)
