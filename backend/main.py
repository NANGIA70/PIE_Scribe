from fastapi import FastAPI, Depends, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import uuid
from datetime import datetime
from dotenv import load_dotenv
from typing import List
from sqlalchemy.orm import Session
import models, database, schemas
from transcription import transcription_service
from intelligence import intelligence_service

load_dotenv()

# Create tables on startup
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Scribe API", version="0.1.0")

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Scribe Backend is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/upload-audio", response_model=schemas.Visit)
async def upload_audio_endpoint(
    file: UploadFile = File(...),
    patient_id: str = Form(...),
    visit_type_id: str = Form("general"),
    db: Session = Depends(database.get_db)
):
    # 1. Save file temporarily
    temp_filename = f"temp_{uuid.uuid4()}.mp3"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 2. Transcribe
        segments_data = await transcription_service.transcribe_audio(temp_filename)
        
        # 3. Create Visit in DB
        visit_id = str(uuid.uuid4())
        new_visit = models.Visit(
            id=visit_id,
            patient_id=patient_id,
            visit_type_id=visit_type_id,
            status=models.VisitStatus.PROCESSING
        )
        db.add(new_visit)
        
        # 4. Save Transcript Segments
        for seg in segments_data:
            db_segment = models.TranscriptSegment(
                visit_id=visit_id,
                speaker=seg["speaker"],
                text=seg["text"],
                start_time=seg["start_time"],
                end_time=seg["end_time"],
                confidence=seg.get("confidence", 1.0)
            )
            db.add(db_segment)
            
        db.commit()
        
        # 5. Generate Note
        # Pass segments to intelligence service
        note_content = await intelligence_service.generate_note_with_structure(segments_data)
        
        # 6. Save Note
        new_note = models.ClinicalNote(
            visit_id=visit_id,
            content=note_content.model_dump()
        )
        db.add(new_note)
        
        db.commit()
        db.refresh(new_visit)
        
        return new_visit

    except Exception as e:
        print(f"Error processing audio: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        # 5. Cleanup
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

@app.get("/visit/{visit_id}", response_model=schemas.Visit)
async def get_visit(visit_id: str, db: Session = Depends(database.get_db)):
    visit = db.query(models.Visit).filter(models.Visit.id == visit_id).first()
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    return visit
