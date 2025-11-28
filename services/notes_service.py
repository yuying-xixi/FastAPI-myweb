from sqlalchemy.orm import Session
from models import Note

print(Note)
# 根据笔记标题查询笔记内容
def get_notes_by_title(db: Session, title: str) -> list[Note]:
    return db.query(Note).filter(Note.note_title == title).all()

