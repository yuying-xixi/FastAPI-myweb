from typing import List
from services import NoteService
from schemas.note import NoteOut
from fastapi import APIRouter, Depends, Request
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