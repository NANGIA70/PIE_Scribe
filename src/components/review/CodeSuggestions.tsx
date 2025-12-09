import React from 'react';
import { MOCK_CODE_SUGGESTIONS } from '../../lib/data';
import { Info, Check, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '../ui/Card';
import type { CodeSuggestion } from '../../lib/types';

interface CodeSuggestionsProps {
    selectedCodes?: CodeSuggestion[];
    onToggleCode?: (code: CodeSuggestion) => void;
}

export const CodeSuggestions: React.FC<CodeSuggestionsProps> = ({ selectedCodes = [], onToggleCode = () => { } }) => {
    return (
        <Card className="overflow-hidden border border-slate-200 shadow-sm animate-in slide-in-from-right-4 duration-500">
            <div className="p-3 bg-indigo-50/50 border-b border-indigo-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-indigo-100 rounded text-indigo-600">
                        <Info size={14} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">Coding Assistant</h3>
                </div>
                <span className="text-xs font-medium text-slate-500">{MOCK_CODE_SUGGESTIONS.length} suggestions</span>
            </div>

            <div className="divide-y divide-slate-100">
                {MOCK_CODE_SUGGESTIONS.map((suggestion) => {
                    const isSelected = selectedCodes.some(c => c.id === suggestion.id);

                    return (
                        <div key={suggestion.id} className={clsx("p-3 transition-colors hover:bg-slate-50", isSelected && "bg-indigo-50/30")}>
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {suggestion.code}
                                    </span>
                                    <span className={clsx(
                                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                                        suggestion.type === 'ICD-10' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                                    )}>
                                        {suggestion.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-green-600" title="Confidence Score">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    {Math.round(suggestion.confidence * 100)}%
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-3 leading-snug">
                                {suggestion.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onToggleCode(suggestion)}
                                    className={clsx(
                                        "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-medium transition-all border",
                                        isSelected
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                    )}
                                >
                                    {isSelected ? (
                                        <>
                                            <Check size={12} /> Accepted
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={12} /> Accept
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
