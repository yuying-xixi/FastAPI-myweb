from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CommentOut(BaseModel):
    comment_id: int
    note_id: int
    user_id: int
    comment_content: str
    comment_create_time: datetime

    class Config:
        orm_mode = True

class CommentCreate(BaseModel):
    note_id: int
    user_id: int
    comment_content: str

class CommentUpdate(BaseModel):
    comment_content: Optional[str] = None