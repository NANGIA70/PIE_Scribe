import React from 'react';
import { PATIENTS } from '../../lib/data';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';

interface PatientPickerProps {
    selectedPatientId: string | null;
    onSelect: (patientId: string) => void;
}

export const PatientPicker: React.FC<PatientPickerProps> = ({ selectedPatientId, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATIENTS.map((patient) => {
                const isSelected = selectedPatientId === patient.id;
                return (
                    <Card
                        key={patient.id}
                        onClick={() => onSelect(patient.id)}
                        className={cn(
                            "cursor-pointer transition-all duration-200 border relative hover:shadow-md flex items-center p-4 gap-4",
                            isSelected
                                ? "border-teal-500 bg-teal-50/50 shadow-sm"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                            isSelected ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"
                        )}>
                            {patient.name[0]}
                        </div>

                        <div className="flex-1">
                            <div className={cn("font-medium", isSelected ? "text-teal-900" : "text-slate-900")}>
                                {patient.name}
                            </div>
                            <div className="text-xs text-slate-500">
                                DOB: {patient.dob} • {patient.gender} • {patient.mrn}
                            </div>
                        </div>

                        {isSelected && (
                            <div className="text-teal-600">
                                <Check size={18} />
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
};
