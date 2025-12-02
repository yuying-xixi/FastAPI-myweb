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
    note = service.get_latest_note_list()
    return note

