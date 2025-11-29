from datetime import datetime, timezone
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship

from models import Base


class Comment(Base):
    __tablename__ = "Comments"  # 表名

    # 主键，自增
    comment_id = Column(Integer, primary_key=True, autoincrement=True)

    # 外键：评论对应的笔记
    note_id = Column(Integer, ForeignKey("Notes.note_id", ondelete="CASCADE"), nullable=False)

    # 外键：评论作者
    user_id = Column(Integer, ForeignKey("Users.user_id", ondelete="CASCADE"), nullable=False)

    # 评论内容
    comment_content = Column(Text, nullable=False)

    # 评论创建时间，默认当前 UTC 时间
    comment_create_time = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # 关系映射，方便通过 ORM 访问关联对象
    # note = relationship("Note", back_populates="comments")  # 可以通过 comment.note 获取笔记对象
    # user = relationship("User", back_populates="comments")  # 可以通过 comment.user 获取用户对象
