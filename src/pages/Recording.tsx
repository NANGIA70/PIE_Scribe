import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecordingTimer } from '../components/recording/RecordingTimer';
import { AudioWaveform } from '../components/recording/AudioWaveform';
import { Button } from '../components/ui/Button';
import { VISIT_TYPES, PATIENTS } from '../lib/data';
import { Mic, Square, Pause, Play, CheckCircle2, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MicTestModal } from '../components/recording/MicTestModal';

export const Recording: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const visitTypeId = location.state?.visitTypeId;
    const patientId = location.state?.patientId;

    const visitType = VISIT_TYPES.find(t => t.id === visitTypeId);
    const patient = PATIENTS.find(p => p.id === patientId);

    const [isRecording, setIsRecording] = useState(true);
    const [isMicTestOpen, setIsMicTestOpen] = useState(false);

    // Audio Capture Refs
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const audioChunksRef = React.useRef<Blob[]>([]);

    React.useEffect(() => {
        // Request Microphone Access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                audioChunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.start();
            })
            .catch(err => {
                console.error("Error accessing microphone:", err);
                setIsRecording(false);
            });

        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

    const handleStop = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            // Wait a tick for the last data chunk
            setTimeout(() => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' }); // Deepgram accepts webm/wav/mp3
                // Navigate with blob
                navigate('/processing', {
                    state: {
                        visitTypeId,
                        patientId,
                        audioBlob
                    }
                });
            }, 200);
        } else {
            // Fallback if no recording (e.g. error)
            navigate('/processing', {
                state: { visitTypeId, patientId, audioBlob: null }
            });
        }
        setIsRecording(false);
    };

    const togglePause = () => {
        if (isRecording) {
            mediaRecorderRef.current?.pause();
        } else {
            mediaRecorderRef.current?.resume();
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-6 animate-in zoom-in-95 duration-500">

            <MicTestModal isOpen={isMicTestOpen} onClose={() => setIsMicTestOpen(false)} />

            <div className="w-full max-w-2xl space-y-8">
                {/* Status Card */}
                <Card className="p-10 flex flex-col items-center text-center shadow-lg border-t-4 border-t-teal-500 relative overflow-hidden">
                    {/* Background Pulse Effect */}
                    {isRecording && (
                        <div className="absolute inset-0 bg-teal-50/50 animate-pulse pointer-events-none" />
                    )}

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-red-500 block" />
                            {isRecording ? "Recording Live Audio" : "Recording Paused"}
                        </div>

                        <RecordingTimer isActive={isRecording} />

                        <div className="w-full my-8">
                            <AudioWaveform isActive={isRecording} />
                        </div>

                        <div className="flex items-center gap-6">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-16 h-16 p-0 flex items-center justify-center border-2 border-slate-200"
                                onClick={togglePause}
                                title={isRecording ? "Pause" : "Resume"}
                            >
                                {isRecording ? <Pause className="fill-slate-600 text-slate-600" /> : <Play className="fill-slate-600 text-slate-600 ml-1" />}
                            </Button>

                            <Button
                                variant="danger"
                                size="lg"
                                className="rounded-full h-20 px-8 text-lg shadow-xl shadow-red-500/20 hover:scale-105 transition-transform"
                                onClick={handleStop}
                            >
                                <Square className="fill-white text-white mr-2" size={20} />
                                Stop & Process
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-16 h-16 p-0 flex items-center justify-center border-2 border-slate-200 text-slate-400"
                                title="Check Mic"
                                onClick={() => setIsMicTestOpen(true)}
                            >
                                <Mic />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Visit Context */}
                <div className="text-center space-y-2">
                    <p className="text-slate-500">
                        Recording for <span className="font-semibold text-slate-800">{visitType?.label || "General Visit"}</span>
                        {patient && (
                            <span className="ml-2 inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full text-sm font-medium text-slate-700">
                                <User size={12} /> {patient.name}
                            </span>
                        )}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                        <CheckCircle2 size={16} />
                        <span>Patient consent verified</span>
                    </div>
                </div>
            </div>
        </div>


    );
};
