import React, { useEffect, useState } from 'react';
import { Loader2, Bot, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useNavigate, useLocation } from 'react-router-dom';

export const ProcessingView: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(0);

    const steps = [
        { label: 'Transcribing audio...', icon: Bot, duration: 1500 },
        { label: 'Structuring SOAP note...', icon: FileText, duration: 1200 },
        { label: 'Analyzing medical codes...', icon: CheckCircle, duration: 1000 },
    ];

    useEffect(() => {
        let currentStep = 0;

        const runSteps = async () => {
            // Start Initial Animation Steps (Transcribing)
            setStep(0);
            await new Promise(r => setTimeout(r, 1500));
            setStep(1);

            // API Call
            if (location.state?.audioBlob) {
                try {
                    const formData = new FormData();
                    formData.append('file', location.state.audioBlob, 'recording.mp3');
                    formData.append('patient_id', location.state.patientId || 'unknown');
                    formData.append('visit_type_id', location.state.visitTypeId || 'general');

                    // Show "Structuring"
                    setStep(2);

                    const response = await fetch('http://localhost:8000/upload-audio', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) throw new Error('Upload failed');

                    const visitData = await response.json();

                    // Show "Analyzing" (briefly)
                    setStep(3);
                    await new Promise(r => setTimeout(r, 800));

                    // Success - Navigate with Visit ID and Data
                    navigate('/review', {
                        state: {
                            visitId: visitData.id,
                            patientId: location.state.patientId
                            // We could pass full data here, but Review page should probably fetch it or receive it.
                            // Let's pass the visit ID so Review can fetch (or pass full data if we refactor Review).
                            // For now, let's pass visitId.
                        }
                    });

                } catch (error) {
                    console.error("Processing error:", error);
                    // Handle error (maybe navigate back or show alert)
                    alert("Processing failed. Please try again.");
                    navigate('/');
                }
            } else {
                // Fallback for demo without audio (if user accessed directly)
                console.warn("No audio blob found, using mock simulation");
                await new Promise(r => setTimeout(r, 2000));
                setStep(2);
                await new Promise(r => setTimeout(r, 1000));
                setStep(3);
                navigate('/review', { state: location.state });
            }
        };

        runSteps();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-6">
            <Card className="w-full max-w-md p-8 flex flex-col items-center text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-20" />
                    <div className="bg-teal-50 p-4 rounded-full text-teal-600 relative z-10">
                        <Loader2 size={48} className="animate-spin" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Generating Note</h2>
                    <p className="text-slate-500">Scribe is processing your visit...</p>
                </div>

                <div className="w-full space-y-4">
                    {steps.map((s, i) => {
                        const isActive = i === step;
                        const isDone = i < step;
                        const Icon = s.icon;

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-4 transition-all duration-500 ${isActive || isDone ? 'opacity-100' : 'opacity-30'
                                    }`}
                            >
                                <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isDone ? 'bg-teal-500 border-teal-500 text-white' :
                                        isActive ? 'border-teal-500 text-teal-600' : 'border-slate-200 text-slate-300'}
                 `}>
                                    {isDone ? <CheckCircle size={14} /> : <Icon size={14} />}
                                </div>
                                <span className={`font-medium ${isActive || isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};
