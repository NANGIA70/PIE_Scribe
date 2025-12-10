from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, JSON, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base

class VisitStatus(str, enum.Enum):
    RECORDING = "recording"
    PROCESSING = "processing"
    REVIEW = "review"
    COMPLETED = "completed"

class Visit(Base):
    __tablename__ = "visits"

    id = Column(String, primary_key=True, index=True) # UUID
    patient_id = Column(String, index=True) # For now, just a string ID
    visit_type_id = Column(String)
    date = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(Enum(VisitStatus), default=VisitStatus.RECORDING)
    
    # Relations
    transcript_segments = relationship("TranscriptSegment", back_populates="visit", cascade="all, delete-orphan")
    clinical_note = relationship("ClinicalNote", back_populates="visit", uselist=False, cascade="all, delete-orphan")

class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"

    id = Column(Integer, primary_key=True, index=True)
    visit_id = Column(String, ForeignKey("visits.id"))
    
    speaker = Column(String) # "Doctor", "Patient", "Speaker 0"
    text = Column(Text)
    start_time = Column(Float)
    end_time = Column(Float)
    confidence = Column(Float, default=1.0)

    visit = relationship("Visit", back_populates="transcript_segments")

class ClinicalNote(Base):
    __tablename__ = "clinical_notes"

    id = Column(Integer, primary_key=True, index=True)
    visit_id = Column(String, ForeignKey("visits.id"), unique=True)
    
    # Storing content as JSONB for flexibility as per design review
    # Structure: { "subjective": [...], "objective": [...], "assessment": [...], "plan": [...] }
    content = Column(JSON)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    visit = relationship("Visit", back_populates="clinical_note")
