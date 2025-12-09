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
    icon: string;
    color?: string;
    checklists?: string[];
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
    speaker: 'doctor' | 'patient' | 'unknown';
    text: string;
    timestamp: number;
    duration: number;
}

export interface NoteSentence {
    id: string;
    text: string;
    confidence: 'high' | 'medium' | 'low';
    audioStart?: number;
    audioEnd?: number;
}

export interface SoapNote {
    subjective: NoteSentence[];
    objective: NoteSentence[];
    assessment: NoteSentence[];
    plan: NoteSentence[];
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
    evidence: string[]; // Changed to string[] of transcript/note IDs
}
