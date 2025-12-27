from typing import List
from services import NoteService
from schemas.note import NoteOut, NoteCreate, NoteUpdate
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(prefix="/api/notes", tags=["Notes"])


@router.get("/", response_model=List[NoteOut])
def list_notes(db: Session = Depends(get_db)):
    service = NoteService(db)
    note_list = service.get_latest_note_list()
    return note_list


@router.get("/{id}", response_model=NoteOut)
def get_note_detail(
        id: int,
        db: Session = Depends(get_db)
):
    service = NoteService(db)
    get_note_detail = service.get_notes_by_note_id(id)
    return get_note_detail

# 创建笔记
@router.post("/", response_model=NoteOut)
def create_note(note_in: NoteCreate, db: Session = Depends(get_db)):
    service = NoteService(db)
    note = service.create(note_in.user_id, note_in.note_title, note_in.note_content)
    return note

# 更新笔记
@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: int, note_update: NoteUpdate, db: Session = Depends(get_db)):
    service = NoteService(db)
    note = service.update(note_id, note_update.note_title, note_update.note_content)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# 删除笔记
@router.delete("/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    service = NoteService(db)
    result = service.delete(note_id)
    if not result:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"success": True}