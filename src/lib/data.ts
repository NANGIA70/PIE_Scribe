import type { VisitType, Patient, TranscriptSegment, CodeSuggestion } from './types';

export const PATIENTS: Patient[] = [
    { id: 'p1', name: 'Sarah Johnson', dob: '1985-03-12', gender: 'F', mrn: 'MRN-9821' },
    { id: 'p2', name: 'Michael Chen', dob: '1962-11-05', gender: 'M', mrn: 'MRN-4421' },
];

export const VISIT_TYPES: VisitType[] = [
    {
        id: 'vt1',
        label: 'URI / Cough',
        color: 'bg-blue-100 text-blue-700',
        checklists: ['Duration of symptoms', 'Fever presence', 'Sputum characteristics', 'Smoking history']
    },
    {
        id: 'vt2',
        label: 'Diabetes Follow-up',
        color: 'bg-purple-100 text-purple-700',
        checklists: ['Medication adherence', 'Home glucose readings', 'Hypoglycemia episodes', 'Foot exam']
    },
    {
        id: 'vt3',
        label: 'General / 15-min',
        color: 'bg-slate-100 text-slate-700',
        checklists: ['Chief complaint', 'HPI', 'ROS']
    },
];

export const MOCK_TRANSCRIPT: TranscriptSegment[] = [
    { id: 's1', speaker: 'doctor', text: "Good morning, Sarah. I see you're here for a cough?", timestamp: '00:00', startSeconds: 0, endSeconds: 5 },
    { id: 's2', speaker: 'patient', text: "Yes, Dr. Lee. It's been really bothering me for about 5 days now.", timestamp: '00:06', startSeconds: 6, endSeconds: 10 },
    { id: 's3', speaker: 'doctor', text: "I'm sorry to hear that. Any fever or chills with that?", timestamp: '00:11', startSeconds: 11, endSeconds: 15 },
    { id: 's4', speaker: 'patient', text: "No fever, but I feel a bit tired. And the cough is dry, nothing comes up.", timestamp: '00:16', startSeconds: 16, endSeconds: 22 },
    { id: 's5', speaker: 'doctor', text: "Okay, dry cough, no sputum. Have you been around anyone sick?", timestamp: '00:23', startSeconds: 23, endSeconds: 28 },
];

export const MOCK_SOAP_NOTE = {
    subjective: "Patient presents with a persistent dry cough starting 5 days ago. She denies fever or chills but reports fatigue. The cough is non-productive.",
    objective: "Vitals: BP 120/80, HR 72, Temp 98.6F. Lungs: Clear to auscultation bilaterally, no wheezes or rales. Pharynx: Mildly erythematous, no exudate.",
    assessment: "Acute viral bronchitis.",
    plan: "Supportive care recommended. Recommended honey for cough suppression and staying hydrated. Return if symptoms worsen or persist > 2 weeks.",
};

export const MOCK_CODES: CodeSuggestion[] = [
    { id: 'c1', code: 'J40', description: 'Bronchitis, not specified as acute or chronic', type: 'ICD-10', confidence: 0.92, evidence: ['persistent dry cough', 'Acute viral bronchitis'] },
    { id: 'c2', code: 'R05', description: 'Cough', type: 'ICD-10', confidence: 0.88, evidence: ['cough is non-productive'] },
    { id: 'c3', code: '99213', description: 'Office/outpatient visit, est patient', type: 'CPT', confidence: 0.95, evidence: [] },
];
