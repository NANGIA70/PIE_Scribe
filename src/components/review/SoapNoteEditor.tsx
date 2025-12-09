import React from 'react';
import { MOCK_SOAP_NOTE } from '../../lib/data';
import { Play } from 'lucide-react';
// import { cn } from '../../lib/utils';

export const SoapNoteEditor: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-slate-700">SOAP Note Draft</h2>
                <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded">Generated in 4s</span>
            </div>

            <div className="p-6 space-y-6">
                <NoteSection label="Subjective" content={MOCK_SOAP_NOTE.subjective} />
                <NoteSection label="Objective" content={MOCK_SOAP_NOTE.objective} />
                <NoteSection label="Assessment" content={MOCK_SOAP_NOTE.assessment} />
                <NoteSection label="Plan" content={MOCK_SOAP_NOTE.plan} />
            </div>
        </div>
    );
};

const NoteSection: React.FC<{ label: string; content: string }> = ({ label, content }) => {
    return (
        <div className="group">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                    {label[0]}
                </span>
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">{label}</h3>
            </div>
            <div className="pl-10 relative">
                <p className="text-slate-800 leading-relaxed text-[15px] p-2 rounded hover:bg-slate-50 -ml-2 border border-transparent hover:border-slate-100 transition-colors cursor-text">
                    {content}
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-2 align-middle bg-teal-50 text-teal-600 rounded-full cursor-pointer hover:bg-teal-100 transition-colors" title="Play source audio">
                        <Play size={10} fill="currentColor" />
                    </span>
                </p>
            </div>
        </div>
    );
};
