import React, { useState } from 'react';
import { TranscriptViewer } from '../components/review/TranscriptViewer';
import { SoapNoteEditor } from '../components/review/SoapNoteEditor';
import { OmissionChecklist } from '../components/review/OmissionChecklist';
import { CodeSuggestions } from '../components/review/CodeSuggestions';
import { Button } from '../components/ui/Button';
import { Download, Copy } from 'lucide-react';

export const Review: React.FC = () => {
    const [highlightedSegment, setHighlightedSegment] = useState<string | null>(null);

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
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Copy size={16} />
                        Copy Note
                    </Button>
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

                {/* Zone B: Note & Analysis (Right) */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-6 custom-scrollbar">
                    <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
                        {/* SOAP Note - Center Stage */}
                        <div className="col-span-12 lg:col-span-8">
                            <SoapNoteEditor />
                        </div>

                        {/* Sidebar Analysis - Right Rail */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <OmissionChecklist visitTypeId="vt1" />
                            <CodeSuggestions />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
