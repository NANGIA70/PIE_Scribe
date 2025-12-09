import React from 'react';
import { VISIT_TYPES } from '../../lib/data';
import { CheckSquare, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface OmissionChecklistProps {
    visitTypeId?: string;
}

export const OmissionChecklist: React.FC<OmissionChecklistProps> = ({ visitTypeId }) => {
    const visitType = VISIT_TYPES.find(t => t.id === visitTypeId) || VISIT_TYPES[0];

    // Simulate some items being checked
    const items = (visitType.checklists || []).map((item, index) => ({
        label: item,
        checked: index % 2 === 0 // Mock status
    }));

    return (
        <Card className="h-full">
            <CardHeader className="py-4">
                <CardTitle className="text-sm uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <CheckSquare size={16} />
                    Omission Guard
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={cn(
                            "mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                            item.checked ? "bg-green-100 border-green-500 text-green-600" : "bg-white border-slate-300"
                        )}>
                            {item.checked && <CheckSquare size={12} fill="currentColor" className="text-green-600" />}
                        </div>
                        <span className={cn(
                            "text-sm",
                            item.checked ? "text-slate-500 line-through" : "text-slate-800 font-medium"
                        )}>
                            {item.label}
                        </span>
                        {!item.checked && (
                            <AlertCircle size={14} className="text-amber-500 ml-auto flex-shrink-0" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
