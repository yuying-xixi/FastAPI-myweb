from sqlalchemy import Column, Integer, String, DateTime, Enum
from datetime import datetime, timezone
import enum
from .base import Base


# 定义 Python 枚举类型对应数据库 ENUM
class UserRole(enum.Enum):
    admin = "admin"
    user = "user"

class User(Base):
    __tablename__ = "Users"

    # 主键，自增
    user_id = Column(Integer, primary_key=True, autoincrement=True)

    # 用户名，唯一约束
    user_name = Column(String(100), nullable=False, unique=True)

    # 密码哈希
    user_password_hash = Column(String(255), nullable=False)

    # 角色：admin 或 user
    role = Column(Enum(UserRole), nullable=False, default=UserRole.user)

    # 创建时间，默认当前时间
    user_create_time = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
