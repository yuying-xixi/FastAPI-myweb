from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .base import Base

class Like(Base):
    __tablename__ = "Likes"  # 表名
    __table_args__ = (
        UniqueConstraint("user_id", "note_id", name="uq_like"),  # 每个用户对同一篇笔记只能点赞一次
    )

    # 主键，自增
    like_id = Column(Integer, primary_key=True, autoincrement=True)

    # 外键：点赞用户
    user_id = Column(Integer, ForeignKey("Users.user_id", ondelete="CASCADE"), nullable=False)

    # 外键：点赞笔记
    note_id = Column(Integer, ForeignKey("Notes.note_id", ondelete="CASCADE"), nullable=False)

    # 点赞时间，默认当前 UTC 时间
    like_create_time = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # 关系映射
    # user = relationship("User", back_populates="likes")  # 可以通过 like.user 获取用户对象
    # note = relationship("Note", back_populates="likes")  # 可以通过 like.note 获取笔记对象