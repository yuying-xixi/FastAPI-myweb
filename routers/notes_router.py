from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from database import get_db
from services import NoteService


router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("/", response_class = HTMLResponse )
async def read_note_by_note_id(request: Request, note_id: int, db: Session = Depends(get_db)):
    service = NoteService(db)
    note = service.get_notes_by_note_id(note_id)
    templates = request.app.state.templates  # 从主 app 里拿模板对象
    if not note:
        raise HTTPException(status_code=404, detail="笔记不存在")
    return templates.TemplateResponse("note_templates.html", {"request": request, "note": note})
