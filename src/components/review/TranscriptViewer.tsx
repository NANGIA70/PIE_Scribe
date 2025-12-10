import React from 'react';
import { MOCK_TRANSCRIPT } from '../../lib/data';
import { cn } from '../../lib/utils';
import { Play } from 'lucide-react';

import type { TranscriptSegment } from '../../lib/types';

const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
};

interface TranscriptViewerProps {
    transcript?: TranscriptSegment[];
    onPlaySegment: (start: number) => void;
    highlightedSegmentId?: string | null;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript = MOCK_TRANSCRIPT, onPlaySegment, highlightedSegmentId }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-2 border-b border-slate-100">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Transcript</h2>
                <span className="text-xs text-slate-400">00:28 total</span>
            </div>

            <div className="space-y-4 pb-20">
                {transcript.map((segment) => {
                    const isHighlighted = highlightedSegmentId === segment.id;
                    return (
                        <div
                            key={segment.id}
                            className={cn(
                                "group relative pl-4 border-l-2 transition-all duration-300 py-1 rounded-r-lg hover:bg-slate-50",
                                isHighlighted ? "border-teal-500 bg-teal-50/50" : "border-transparent"
                            )}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className={cn(
                                    "text-xs font-bold uppercase",
                                    segment.speaker === 'doctor' ? "text-teal-600" : "text-blue-600"
                                )}>
                                    {segment.speaker}
                                </span>
                                <span className="text-[10px] font-mono text-slate-300 group-hover:text-slate-400">
                                    {formatTime(segment.timestamp)}
                                </span>
                            </div>

                            <p className={cn(
                                "text-sm leading-relaxed",
                                isHighlighted ? "text-slate-900 font-medium" : "text-slate-600"
                            )}>
                                {segment.text}
                            </p>

                            <button
                                onClick={() => onPlaySegment(segment.timestamp)}
                                className={cn(
                                    "absolute -left-3 top-2 w-6 h-6 bg-white border shadow-sm rounded-full flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100",
                                    isHighlighted && "opacity-100 border-teal-500 text-teal-600"
                                )}
                            >
                                <Play size={10} fill="currentColor" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
