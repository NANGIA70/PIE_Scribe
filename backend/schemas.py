from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class TranscriptSegmentBase(BaseModel):
    speaker: str
    text: str
    start_time: float
    end_time: float
    confidence: float = 1.0

class TranscriptSegmentCreate(TranscriptSegmentBase):
    pass

class TranscriptSegment(TranscriptSegmentBase):
    id: int
    visit_id: str

    class Config:
        from_attributes = True

class Evidence(BaseModel):
    segment_ids: List[int]

class NoteSentence(BaseModel):
    text: str
    evidence: Evidence

class SoapSection(BaseModel):
    sentences: List[NoteSentence]

class ClinicalNoteStructured(BaseModel):
    subjective: SoapSection
    objective: SoapSection
    assessment: SoapSection
    plan: SoapSection

class ClinicalNote(BaseModel):
    id: int
    visit_id: str
    content: ClinicalNoteStructured
    created_at: datetime

    class Config:
        from_attributes = True

class VisitBase(BaseModel):
    patient_id: str
    visit_type_id: Optional[str] = None

class VisitCreate(VisitBase):
    pass

class Visit(VisitBase):
    id: str
    date: datetime
    status: str
    transcript_segments: List[TranscriptSegment] = []
    clinical_note: Optional[ClinicalNote] = None

    class Config:
        from_attributes = True
