import React from 'react';
import { MOCK_CODES } from '../../lib/data';
import { Tag, Search } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const CodeSuggestions: React.FC = () => {
    return (
        <Card className="h-full">
            <CardHeader className="py-4">
                <CardTitle className="text-sm uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Tag size={16} />
                    Suggested Codes
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {MOCK_CODES.map((code) => (
                    <div key={code.id} className="group p-3 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-white font-mono text-slate-700">{code.code}</Badge>
                                <Badge
                                    variant={code.confidence > 0.9 ? 'success' : 'warning'}
                                    className="text-[10px] px-1.5 py-0"
                                >
                                    {Math.round(code.confidence * 100)}% Match
                                </Badge>
                            </div>
                            <Search size={14} className="text-slate-300 group-hover:text-teal-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-2">{code.description}</p>
                        {code.evidence.length > 0 && (
                            <div className="text-xs text-slate-500 border-l-2 border-slate-200 pl-2 italic">
                                "{code.evidence[0]}"
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
