import type { Patient, VisitType, TranscriptSegment, SoapNote, CodeSuggestion } from './types';

export const PATIENTS: Patient[] = [
    { id: 'p1', name: 'Emma Thompson', mrn: 'MRN-78210', dob: '1985-04-12', gender: 'F' },
    { id: 'p2', name: 'James Wilson', mrn: 'MRN-55921', dob: '1962-08-23', gender: 'M' },
    { id: 'p3', name: 'Sophia Chen', mrn: 'MRN-10293', dob: '1990-11-30', gender: 'F' },
];

export const VISIT_TYPES: VisitType[] = [
    { id: 'vt1', label: 'URI / Cough', icon: 'thermometer' },
    { id: 'vt2', label: 'Diabetes Follow-up', icon: 'activity' },
    { id: 'vt3', label: 'MSK / Joint Pain', icon: 'user' },
    { id: 'vt4', label: 'General / 15-min', icon: 'clock' },
];

export const MOCK_TRANSCRIPT: TranscriptSegment[] = [
    { id: 's1', speaker: 'doctor', text: "Hi Emma, good to see you. What brings you in today?", timestamp: 0, duration: 4 },
    { id: 's2', speaker: 'patient', text: "Hi Dr. Lee. I've had this nagging cough for about 5 days now, and it's just not going away.", timestamp: 4, duration: 6 },
    { id: 's3', speaker: 'doctor', text: "I see. Is it a dry cough or are you bringing anything up?", timestamp: 10, duration: 4 },
    { id: 's4', speaker: 'patient', text: "It's mostly dry, maybe a little phlegm in the morning but clear. No fever, but I feel a bit run down.", timestamp: 14, duration: 8 },
    { id: 's5', speaker: 'doctor', text: "Okay. Any shortness of breath or chest pain?", timestamp: 22, duration: 3 },
    { id: 's6', speaker: 'patient', text: "No, nothing like that. Just the cough and a scratchy throat.", timestamp: 25, duration: 4 },
];

export const MOCK_SOAP_NOTE: SoapNote = {
    subjective: [
        { id: 'sub1', text: "Patient presents with a 5-day history of persistent cough.", confidence: 'high', audioStart: 4, audioEnd: 10 },
        { id: 'sub2', text: "Reports cough is non-productive, with occasional clear phlegm in the morning.", confidence: 'high', audioStart: 14, audioEnd: 22 },
        { id: 'sub3', text: "Denies fever, shortness of breath, or chest pain.", confidence: 'high', audioStart: 22, audioEnd: 25 },
        { id: 'sub4', text: "Complains of associated fatigue and scratchy throat.", confidence: 'medium', audioStart: 25, audioEnd: 29 }
    ],
    objective: [
        { id: 'obj1', text: "Constitutional: Well-developed, well-nourished, in no acute distress.", confidence: 'high' },
        { id: 'obj2', text: "ENT: Oropharynx clear, no exudates. Mucous membranes moist.", confidence: 'high', audioStart: 50, audioEnd: 55 },
        { id: 'obj3', text: "Lungs: Clear to auscultation bilaterally. No wheezes, rales, or rhonchi.", confidence: 'medium', audioStart: 60, audioEnd: 65 },
        { id: 'obj4', text: "CV: Regular rate and rhythm.", confidence: 'high' }
    ],
    assessment: [
        { id: 'ass1', text: "Acute upper respiratory infection, unspecified.", confidence: 'high' },
        { id: 'ass2', text: "Viral bronchitis.", confidence: 'low' }
    ],
    plan: [
        { id: 'pl1', text: "Supportive care with hydration and rest.", confidence: 'high' },
        { id: 'pl2', text: "Over-the-counter cough suppressants (Dextromethorphan) as needed.", confidence: 'high' },
        { id: 'pl3', text: "Return to clinic if symptoms worsen or high fever develops.", confidence: 'medium' }
    ]
};

export const MOCK_CODE_SUGGESTIONS: CodeSuggestion[] = [
    {
        id: 'c1',
        code: 'J06.9',
        description: 'Acute upper respiratory infection, unspecified',
        type: 'ICD-10',
        confidence: 0.95,
        evidence: ['sub1', 'sub3']
    },
    {
        id: 'c2',
        code: 'R05',
        description: 'Cough',
        type: 'ICD-10',
        confidence: 0.88,
        evidence: ['sub2']
    },
    {
        id: 'c3',
        code: '99213',
        description: 'Office Visit, Est Patient, Level 3',
        type: 'CPT',
        confidence: 0.92,
        evidence: ['subjective', 'assessment']
    }
];
