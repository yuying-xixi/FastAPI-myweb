from pydantic import BaseModel

class UserCreate(BaseModel):
    user_name: str
    password: str
    role: str = "user"  # 默认注册为普通用户

class UserLogin(BaseModel):
    user_name: str
    password: str