import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Shield, Mic, Volume2, Trash2, Save, Database, Sliders, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { clsx } from 'clsx';

export const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your experience and data preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data Retention */}
                <Section icon={Shield} title="Data Privacy & Retention">
                    <p className="text-sm text-slate-600 mb-4">
                        We prioritize patient privacy. Configure how long local data is retained.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="text-sm font-medium text-slate-700">Local Cache</span>
                            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">24 Hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="text-sm font-medium text-slate-700">Audio Segments</span>
                            <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">Auto-delete</span>
                        </div>
                    </div>
                </Section>

                {/* Audio Settings */}
                <Section icon={Mic} title="Audio Input">
                    <p className="text-sm text-slate-600 mb-4">
                        Default microphone settings for visit recordings.
                    </p>
                    <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-slate-700 truncate">MacBook Pro Microphone</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Test Microphone
                        </Button>
                    </div>
                </Section>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Sliders size={18} /> Feature Flags
                    </h3>
                    <div className="space-y-4">
                        <Toggle label="Audio Citations" defaultChecked />
                        <Toggle label="Omission Checklist" defaultChecked />
                        <Toggle label="Code Suggestions" defaultChecked />
                    </div>
                </Card>

                <Card className="p-6 border-amber-200 bg-amber-50/30">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-amber-500" /> Demo Controls
                    </h3>
                    <div className="space-y-4">
                        <Toggle label="Demo Mode (Fake PHI)" defaultChecked />
                        <div className="pt-2">
                            <Button variant="outline" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50">
                                Reset All Demo Data
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const Toggle: React.FC<{ label: string; defaultChecked?: boolean }> = ({ label, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">{label}</span>
            <button
                onClick={() => setChecked(!checked)}
                className={clsx(
                    "w-11 h-6 rounded-full transition-colors relative",
                    checked ? "bg-teal-500" : "bg-slate-200"
                )}
            >
                <div className={clsx(
                    "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-sm",
                    checked ? "left-6" : "left-1"
                )} />
            </button>
        </div>
    );
};

const Section: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <Card className="hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <Icon size={20} />
                </div>
                {title}
            </h3>
            {children}
        </div>
    </Card>
);
