import React, { useState } from 'react';
import { TranscriptViewer } from '../components/review/TranscriptViewer';
import { SoapNoteEditor } from '../components/review/SoapNoteEditor';
import { OmissionChecklist } from '../components/review/OmissionChecklist';
import { CodeSuggestions } from '../components/review/CodeSuggestions';
import { Button } from '../components/ui/Button';
import { Download, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PATIENTS } from '../lib/data';
import type { CodeSuggestion } from '../lib/types';

export const Review: React.FC = () => {
    const [highlightedSegment, setHighlightedSegment] = useState<string | null>(null);
    const [selectedCodes, setSelectedCodes] = useState<CodeSuggestion[]>([]);

    const location = useLocation();
    const patientId = location.state?.patientId;
    const patient = PATIENTS.find(p => p.id === patientId);

    const handleToggleCode = (code: CodeSuggestion) => {
        setSelectedCodes(prev => {
            const exists = prev.find(c => c.id === code.id);
            if (exists) return prev.filter(c => c.id !== code.id);
            return [...prev, code];
        });
    };

    const handlePlaySegment = (startSeconds: number) => {
        console.log(`Playing audio from ${startSeconds}s`);
        // Mock highlight effect
        // Find segment close to startSeconds (simplified)
        const segmentId = 's' + (Math.floor(startSeconds / 5) + 1);
        // In real app logic would be robust. Using simplified mapping for demo visual.
        setHighlightedSegment(segmentId);
        setTimeout(() => setHighlightedSegment(null), 3000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">

            {/* Toolbar / Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-slate-800">Visit Review</h1>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">Automated Draft</span>
                    {patient && (
                        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
                            <User size={16} className="text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">{patient.name}</span>
                            <span className="text-xs text-slate-400 uppercase">{patient.mrn}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download size={16} />
                        Export FHIR
                    </Button>
                    <Button variant="primary" size="sm" className="gap-2">
                        Approve & Sign
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Zone A: Transcript (Left) */}
                <div className="w-[350px] flex-shrink-0 bg-white border-r border-slate-200 overflow-y-auto p-4 custom-scrollbar">
                    <TranscriptViewer onPlaySegment={handlePlaySegment} highlightedSegmentId={highlightedSegment} />
                </div>

                {/* Center Panel - Note Editor */}
                <div className="flex-1 overflow-auto bg-slate-50 p-6 flex justify-center">
                    <div className="w-full max-w-3xl h-full pb-20">
                        <SoapNoteEditor selectedCodes={selectedCodes} />
                    </div>
                </div>

                {/* Right Panel - Assistance */}
                <div className="w-80 bg-white border-l border-slate-200 overflow-auto flex-shrink-0">
                    <div className="p-4 space-y-6">
                        <OmissionChecklist />
                        <CodeSuggestions
                            selectedCodes={selectedCodes}
                            onToggleCode={handleToggleCode}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};
