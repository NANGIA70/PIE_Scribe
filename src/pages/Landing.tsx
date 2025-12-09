import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisitTypePicker } from '../components/visit/VisitTypePicker';
import { RecentVisits } from '../components/visit/RecentVisits';
import { PatientPicker } from '../components/visit/PatientPicker';
import { Button } from '../components/ui/Button';
import { Mic, User } from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '../components/ui/Card';

export const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    const handleStart = () => {
        if (selectedTypeId) {
            navigate('/recording', {
                state: {
                    visitTypeId: selectedTypeId,
                    patientId: selectedPatientId
                }
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 lg:p-12 space-y-12">

            {/* Hero / Start Section */}
            <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                        Ready for a new visit?
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Select context to configure content guardrails.
                    </p>
                </div>

                <div className="w-full max-w-3xl space-y-8">
                    {/* Patient Context Section */}
                    <div className="text-left space-y-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">1. Select Patient (Optional)</h3>
                        <PatientPicker selectedPatientId={selectedPatientId} onSelect={setSelectedPatientId} />
                    </div>

                    {/* Visit Type Section */}
                    <div className="text-left space-y-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">2. Select Visit Type</h3>
                        <VisitTypePicker
                            selectedTypeId={selectedTypeId}
                            onSelect={setSelectedTypeId}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-8 pt-8 border-t border-slate-100">
                        <Button
                            size="lg"
                            className={clsx(
                                "rounded-full px-12 py-8 text-xl shadow-lg shadow-teal-500/20 transition-all duration-300",
                                selectedTypeId ? "scale-105" : "opacity-90"
                            )}
                            disabled={!selectedTypeId}
                            onClick={handleStart}
                        >
                            <Mic className="mr-3 h-6 w-6" />
                            Start New Visit
                        </Button>

                        {!selectedTypeId && (
                            <p className="text-sm text-slate-400 animate-pulse">Select a visit type to begin</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <RecentVisits />

                {/* Placeholder for future features */}
                <Card className="flex flex-col items-center justify-center p-8 border-dashed border-2 border-slate-200 bg-slate-50/50 shadow-none">
                    <User size={32} className="mb-3 text-slate-300" />
                    <p className="font-medium text-slate-500">Provider Profile</p>
                    <p className="text-sm text-slate-400">Manage templates & defaults</p>
                </Card>
            </div>
        </div>
    );
};
