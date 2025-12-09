import React, { useState } from 'react';
import { MOCK_SOAP_NOTE } from '../../lib/data';
import { Play, AlertTriangle, Check, Copy, CheckCircle2 } from 'lucide-react';
import type { NoteSentence, SoapNote, CodeSuggestion } from '../../lib/types';
import { clsx } from 'clsx';
import { Button } from '../ui/Button';

export const SoapNoteEditor: React.FC<{ selectedCodes?: CodeSuggestion[] }> = ({ selectedCodes = [] }) => {
    const [note, setNote] = useState<SoapNote>(MOCK_SOAP_NOTE);
    const [minConfidence, setMinConfidence] = useState<'low' | 'high'>('low');
    const [copied, setCopied] = useState(false);

    const handleTextChange = (section: keyof SoapNote, id: string, newText: string) => {
        setNote(prev => ({
            ...prev,
            [section]: prev[section].map(s => s.id === id ? { ...s, text: newText } : s)
        }));
    };

    const handleCopy = () => {
        const sections = [
            `Subjective:\n${note.subjective.map(s => s.text).join('\n')}`,
            `Objective:\n${note.objective.map(s => s.text).join('\n')}`,
            `Assessment:\n${note.assessment.map(s => s.text).join('\n')}`,
            `Plan:\n${note.plan.map(s => s.text).join('\n')}`
        ];

        navigator.clipboard.writeText(sections.join('\n\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filterVisible = (sentence: NoteSentence) => {
        if (minConfidence === 'high') return sentence.confidence === 'high';
        return true;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm font-semibold text-slate-700">SOAP Note Draft</h2>
                    <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded">Generated in 4s</span>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className={clsx("h-8 gap-2 transition-all", copied ? "text-green-600 border-green-200 bg-green-50" : "text-slate-600")}
                        onClick={handleCopy}
                    >
                        {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                    </Button>

                    <div className="w-px h-4 bg-slate-200" />

                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                        <button
                            onClick={() => setMinConfidence('low')}
                            className={clsx(
                                "px-2 py-1 text-xs font-medium rounded transition-colors",
                                minConfidence === 'low' ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setMinConfidence('high')}
                            className={clsx(
                                "px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1",
                                minConfidence === 'high' ? "bg-green-50 text-green-700" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Check size={10} /> High Conf
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-8 overflow-auto flex-1">
                <NoteSection
                    label="Subjective"
                    sentences={note.subjective.filter(filterVisible)}
                    sectionKey="subjective"
                    onUpdate={handleTextChange}
                />
                <NoteSection
                    label="Objective"
                    sentences={note.objective.filter(filterVisible)}
                    sectionKey="objective"
                    onUpdate={handleTextChange}
                />
                <NoteSection
                    label="Assessment"
                    sentences={note.assessment.filter(filterVisible)}
                    sectionKey="assessment"
                    onUpdate={handleTextChange}
                />
                <NoteSection
                    label="Plan"
                    sentences={note.plan.filter(filterVisible)}
                    sectionKey="plan"
                    onUpdate={handleTextChange}
                />

                {/* Billing / Code Summary Section */}
                {selectedCodes.length > 0 && (
                    <div className="border-t border-slate-200 pt-6 mt-4 animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                $
                            </div>
                            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Billing & Coding</h3>
                        </div>

                        <div className="ml-10 space-y-2">
                            {selectedCodes.map(code => (
                                <div key={code.id} className="flex justify-between items-center p-3 bg-indigo-50/30 rounded-lg border border-indigo-100">
                                    <div>
                                        <span className="font-mono font-bold text-indigo-900 mr-2">{code.code}</span>
                                        <span className="text-sm text-indigo-800">{code.description}</span>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 bg-white rounded text-indigo-600 border border-indigo-200">{code.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

interface NoteSectionProps {
    label: string;
    sentences: NoteSentence[];
    sectionKey: keyof SoapNote;
    onUpdate: (section: keyof SoapNote, id: string, text: string) => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({ label, sentences, sectionKey, onUpdate }) => {
    return (
        <div className="group">
            <div className="flex items-center gap-2 mb-3 sticky top-0 bg-white/90 py-2 z-10 w-fit pr-4 rounded-r-lg">
                <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs ring-1 ring-teal-100">
                    {label[0]}
                </span>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{label}</h3>
            </div>

            <div className="space-y-3 pl-2 border-l-2 border-slate-100 ml-4">
                {sentences.length === 0 && (
                    <p className="text-sm text-slate-400 italic pl-4">No high-confidence content.</p>
                )}
                {sentences.map((sentence) => (
                    <div
                        key={sentence.id}
                        className={clsx(
                            "relative group/sentence transition-all duration-300",
                            sentence.confidence === 'low' && "bg-red-50/30",
                            sentence.confidence === 'medium' && "bg-yellow-50/30"
                        )}
                    >
                        {/* Confidence Indicator Line */}
                        <div className={clsx(
                            "absolute -left-[10px] top-1.5 w-1 h-4 rounded-full",
                            sentence.confidence === 'high' ? "bg-transparent group-hover/sentence:bg-slate-200" :
                                sentence.confidence === 'medium' ? "bg-yellow-400" : "bg-red-400"
                        )} />

                        <div className="flex gap-3 pl-4 py-1 rounded-md hover:bg-slate-50 relative">
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => onUpdate(sectionKey, sentence.id, e.currentTarget.innerText)}
                                className="flex-1 text-sm text-slate-700 leading-relaxed outline-none focus:bg-white focus:ring-2 focus:ring-teal-100 rounded px-1 transition-all"
                            >
                                {sentence.text}
                            </div>

                            {/* Actions */}
                            <div className="flex items-start gap-1 opacity-0 group-hover/sentence:opacity-100 transition-opacity">
                                {sentence.audioStart !== undefined && (
                                    <button className="p-1 hover:bg-teal-100 text-teal-600 rounded" title={`Play source audio (${sentence.audioStart}s)`}>
                                        <Play size={12} className="fill-teal-600" />
                                    </button>
                                )}
                                {sentence.confidence !== 'high' && (
                                    <span className="p-1 text-yellow-500 cursor-help" title="Check prediction">
                                        <AlertTriangle size={12} />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
