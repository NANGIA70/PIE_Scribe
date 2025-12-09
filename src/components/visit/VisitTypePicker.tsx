import React from 'react';
import { VISIT_TYPES } from '../../lib/data';
import { Card } from '../ui/Card';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
// import { VisitType } from '../../lib/types';

interface VisitTypePickerProps {
    selectedTypeId: string | null;
    onSelect: (typeId: string) => void;
}

export const VisitTypePicker: React.FC<VisitTypePickerProps> = ({ selectedTypeId, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {VISIT_TYPES.map((type) => {
                const isSelected = selectedTypeId === type.id;
                return (
                    <Card
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        className={cn(
                            "cursor-pointer transition-all duration-200 border-2 relative hover:shadow-md",
                            isSelected
                                ? "border-teal-500 bg-teal-50/50 shadow-sm"
                                : "border-transparent hover:border-slate-200 bg-white"
                        )}
                    >
                        <div className="p-4 flex flex-col items-center justify-center text-center h-full min-h-[120px]">
                            {isSelected && (
                                <div className="absolute top-2 right-2 text-teal-600">
                                    <Check size={18} />
                                </div>
                            )}
                            <span className={cn("font-semibold text-lg mb-2", isSelected ? "text-teal-900" : "text-slate-700")}>
                                {type.label}
                            </span>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {type.checklists.slice(0, 2).map((item, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">
                                        {item}
                                    </span>
                                ))}
                                {type.checklists.length > 2 && (
                                    <span className="text-xs px-2 py-0.5 bg-slate-50 text-slate-400">+{type.checklists.length - 2}</span>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};
