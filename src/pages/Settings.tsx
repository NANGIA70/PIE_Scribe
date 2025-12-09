import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Shield, Mic, Volume2 } from 'lucide-react';

export const Settings: React.FC = () => {
    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

            <div className="space-y-6">
                <Section title="Data & Privacy" icon={<Shield size={18} />}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="text-sm font-medium text-slate-900 block">Data Retention Period</label>
                                <span className="text-xs text-slate-500">How long audio and transcripts are stored before permanent deletion.</span>
                            </div>
                            <select className="bg-white border border-slate-300 rounded-lg text-sm p-2 outline-none focus:ring-2 focus:ring-teal-500">
                                <option>24 Hours</option>
                                <option>48 Hours</option>
                                <option>7 Days</option>
                                <option>Manual Only</option>
                            </select>
                        </div>
                    </div>
                </Section>

                <Section title="Audio & Recording" icon={<Mic size={18} />}>
                    <div className="space-y-4">
                        <Toggle label="Enable Audio Citations" description="Allow clicking on note text to play original audio." defaultChecked />
                        <Toggle label="Background Noise Reduction" description="Automatically filter out non-speech audio." defaultChecked />
                    </div>
                </Section>

                <Section title="System" icon={<Volume2 size={18} />}>
                    <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                        <span className="font-semibold">Demo Mode Active:</span> Mock data is being used for all processing simulation.
                    </div>
                </Section>
            </div>
        </div>
    );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <Card>
        <CardHeader className="border-b border-slate-100 py-4 mb-2">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const Toggle: React.FC<{ label: string; description: string; defaultChecked?: boolean }> = ({ label, description, defaultChecked }) => (
    <div className="flex items-center justify-between">
        <div>
            <div className="text-sm font-medium text-slate-900">{label}</div>
            <div className="text-xs text-slate-500">{description}</div>
        </div>
        <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </div>
    </div>
);
