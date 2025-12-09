import React, { useState, useEffect } from 'react';
import { Mic, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MicTestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MicTestModal: React.FC<MicTestModalProps> = ({ isOpen, onClose }) => {
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            // Simulate voice activity
            setVolume(Math.random() * 100);
        }, 100);
        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-md p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X size={20} />
                </button>

                <h2 className="text-lg font-bold text-slate-900 mb-2">Microphone Check</h2>
                <p className="text-slate-500 text-sm mb-6">
                    Speak to test your microphone input. You should see the bar move.
                </p>

                <div className="bg-slate-50 rounded-lg p-6 flex flex-col items-center gap-4 mb-6">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <Mic size={32} className="text-teal-600" />
                    </div>

                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-teal-500 transition-all duration-75 ease-out"
                            style={{ width: `${volume}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}>Looks Good</Button>
                </div>
            </Card>
        </div>
    );
};
