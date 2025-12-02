from services import NoteService
from database import SessionLocal

# 创建一个 Session
db = SessionLocal()
# note对象
note  = NoteService(db)

note_item = note.get_notes_by_note_id(1)
print(note_item.note_title)

note_list = note.get_latest_note_list()
print(note_list)