from services import NoteService
from database import SessionLocal

# 创建一个 Session
db = SessionLocal()
note  = NoteService(db)
list = note.get_notes_by_note_id(1)
print(list.note_title)