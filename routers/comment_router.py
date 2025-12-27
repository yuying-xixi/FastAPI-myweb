from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from services import CommentService
from schemas.comment import CommentOut, CommentCreate, CommentUpdate

router = APIRouter(prefix="/api/comments", tags=["comments"])

# 获取指定笔记的评论列表
@router.get("/note/{note_id}", response_model=List[CommentOut])
def get_comments(note_id: int, db: Session = Depends(get_db)):
    service = CommentService(db)
    return service.get_comments_by_note_id(note_id)

# 添加评论
@router.post("/", response_model=CommentOut)
def add_comment(comment_in: CommentCreate, db: Session = Depends(get_db)):
    service = CommentService(db)
    return service.create(comment_in.note_id, comment_in.user_id, comment_in.comment_content)

# 删除评论
@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    service = CommentService(db)
    result = service.delete(comment_id)
    if not result:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"success": True}

# 可选：更新评论
@router.put("/{comment_id}", response_model=CommentOut)
def update_comment(comment_id: int, comment_update: CommentUpdate, db: Session = Depends(get_db)):
    service = CommentService(db)
    comment = service.update(comment_id, comment_update.comment_content)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment