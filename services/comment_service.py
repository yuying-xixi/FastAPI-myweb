from sqlalchemy.orm import Session
from models import Comment
from datetime import datetime, timezone

class CommentService:
    def __init__(self, db_session: Session):
        self.db = db_session

    # 创建评论
    def create(self, note_id: int, user_id: int, content: str) -> Comment:
        comment = Comment(
            note_id=note_id,
            user_id=user_id,
            comment_content=content,
            comment_create_time=datetime.now(timezone.utc)
        )
        self.db.add(comment)
        self.db.commit()
        self.db.refresh(comment)
        return comment

    # 获取笔记的所有评论
    def get_comments_by_note_id(self, note_id: int):
        return self.db.query(Comment).filter(Comment.note_id == note_id).order_by(Comment.comment_create_time.asc()).all()

    # 删除评论
    def delete(self, comment_id: int) -> bool:
        comment = self.db.query(Comment).filter(Comment.comment_id == comment_id).first()
        if not comment:
            return False
        self.db.delete(comment)
        self.db.commit()
        return True

    # 可选：更新评论
    def update(self, comment_id: int, content: str):
        comment = self.db.query(Comment).filter(Comment.comment_id == comment_id).first()
        if not comment:
            return None
        comment.comment_content = content
        self.db.commit()
        self.db.refresh(comment)
        return comment