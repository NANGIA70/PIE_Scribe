export interface Patient {
    id: string;
    name: string;
    dob: string;
    gender: 'M' | 'F' | 'Other';
    mrn: string;
}

export interface VisitType {
    id: string;
    label: string;
    color: string;
    checklists: string[];
}

export interface Visit {
    id: string;
    patientId: string;
    providerId: string;
    visitTypeId: string;
    date: string;
    status: 'recording' | 'processing' | 'review' | 'completed';
    durationSeconds: number;
}

export interface TranscriptSegment {
    id: string;
    speaker: 'doctor' | 'patient';
    text: string;
    timestamp: string; // e.g. "00:15"
    startSeconds: number;
    endSeconds: number;
}

export interface SoapNote {
    id: string;
    visitId: string;
    subjective: NoteSection;
    objective: NoteSection;
    assessment: NoteSection;
    plan: NoteSection;
}

export interface NoteSection {
    text: string;
    citations: Citation[];
}

export interface Citation {
    id: string;
    textSpan: string; // The text in the note
    segmentId: string; // Link to transcript segment
}

export interface CodeSuggestion {
    id: string;
    code: string;
    description: string;
    type: 'ICD-10' | 'CPT';
    confidence: number;
    evidence: string[]; // Quotes from transcript
}
