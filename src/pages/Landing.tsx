import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisitTypePicker } from '../components/visit/VisitTypePicker';
import { RecentVisits } from '../components/visit/RecentVisits';
import { Button } from '../components/ui/Button';
import { Mic, User } from 'lucide-react';
import { clsx } from 'clsx';

export const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

    const handleStart = () => {
        if (selectedTypeId) {
            navigate('/recording', { state: { visitTypeId: selectedTypeId } });
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
                        Select a visit type to configure content guardrails.
                    </p>
                </div>

                <div className="w-full max-w-3xl">
                    <VisitTypePicker
                        selectedTypeId={selectedTypeId}
                        onSelect={setSelectedTypeId}
                    />

                    <div className="flex flex-col items-center gap-4 mt-8">
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
                            <p className="text-sm text-slate-400 animate-pulse">Select a visit type above to begin</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <RecentVisits />

                {/* Patient Lookup Placeholder */}
                <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-colors cursor-pointer group">
                    <User size={32} className="mb-3 text-slate-400 group-hover:text-slate-600" />
                    <p className="font-medium">Lookup Patient</p>
                    <p className="text-sm opacity-70">Pre-select patient context</p>
                </div>
            </div>
        </div>
    );
};
