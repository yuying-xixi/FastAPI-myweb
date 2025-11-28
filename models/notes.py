from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime, timezone
from .base import Base

class Note(Base):
    __tablename__ = "Notes"  # 表名

    # 主键，自增
    note_id = Column(Integer, primary_key=True, autoincrement=True)

    # 外键字段
    user_id = Column(Integer, ForeignKey("Users.user_id", ondelete="CASCADE"), nullable=False)

    # 笔记标题
    note_title = Column(String(255), nullable=False)

    # 笔记内容
    note_content = Column(Text, nullable=False)

    # 创建时间
    note_create_time = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # 更新时间，每次修改自动刷新
    note_update_time = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # 点赞和浏览次数
    note_like_count = Column(Integer, default=0, nullable=False)
    note_view_count = Column(Integer, default=0, nullable=False)

