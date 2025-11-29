from sqlalchemy.orm import Session
from models import Note
from datetime import datetime, timezone

class NoteService:
    def __init__(self, db_session: Session):
        self.db = db_session

    # 创建笔记
    def create(self, user_id: int, title: str, content: str) -> Note:
        note = Note(
            user_id=user_id,
            note_title=title,
            note_content=content,
            note_create_time=datetime.now(timezone.utc),
            note_update_time=datetime.now(timezone.utc)
        )
        self.db.add(note)
        self.db.commit()
        self.db.refresh(note)  # 刷新对象，拿到数据库生成的 ID
        return note

    # 根据 ID 获取笔记
    def get_notes_by_note_id(self, note_id: int) -> Note | None:
        return self.db.query(Note).filter(Note.note_id == note_id).first()

    # 更新笔记
    def update(self, note_id: int, title: str | None = None, content: str | None = None) -> Note | None:
        note = self.get_notes_by_note_id(note_id)
        if not note:
            return None
        if title:
            note.note_title = title
        if content:
            note.note_content = content
        note.note_update_time = datetime.now(timezone.utc)
        self.db.commit()
        self.db.refresh(note)
        return note

    # 删除笔记
    def delete(self, note_id: int) -> bool:
        note = self.get_notes_by_note_id(note_id)
        if not note:
            return False
        self.db.delete(note)
        self.db.commit()
        return True

    # 获取笔记列表（分页示例）
    def list(self, offset: int = 0, limit: int = 20):
        return self.db.query(Note).order_by(Note.note_create_time.desc()).offset(offset).limit(limit).all()
