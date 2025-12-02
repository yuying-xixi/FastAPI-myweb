from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# 用于返回给前端的模型
class NoteOut(BaseModel):
    note_id: int
    user_id: int
    note_title: str
    note_content: str
    note_create_time: datetime
    note_update_time: datetime
    note_like_count: int
    note_view_count: int

    class Config:
        orm_mode = True  # ⚡ 允许从 ORM 对象读取

# 用于创建笔记
class NoteCreate(BaseModel):
    user_id: int
    note_title: str
    note_content: str

# 用于更新笔记
class NoteUpdate(BaseModel):
    note_title: Optional[str] = None
    note_content: Optional[str] = None
