from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from services import UserService
from schemas.user import UserCreate, UserLogin

router = APIRouter(prefix="/api/users", tags=["users"])

# 注册
@router.post("/register")
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    user = service.create_user(user_in.user_name, user_in.password, user_in.role)
    return {"user_id": user.user_id, "user_name": user.user_name, "role": user.role}

# 登录
@router.post("/login")
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    service = UserService(db)
    user = service.authenticate(user_in.user_name, user_in.password)
    if not user:
        raise HTTPException(status_code=400, detail="用户名或密码错误")
    return {"user_id": user.user_id, "user_name": user.user_name, "role": user.role}