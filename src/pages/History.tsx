import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Clock, Calendar, ArrowRight, BarChart } from 'lucide-react';

export const History: React.FC = () => {
    const visits = [
        { id: 1, patient: 'Sarah Johnson', type: 'URI / Cough', date: 'Today, 2:30 PM', duration: '12m', saved: '4m' },
        { id: 2, patient: 'Michael Chen', type: 'Diabetes Follow-up', date: 'Today, 10:15 AM', duration: '18m', saved: '7m' },
        { id: 3, patient: 'Emily Davis', type: 'General / 15-min', date: 'Yesterday, 4:45 PM', duration: '14m', saved: '5m' },
        { id: 4, patient: 'James Wilson', type: 'MSK / Joint Pain', date: 'Yesterday, 1:20 PM', duration: '22m', saved: '9m' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Visit History</h1>
                <div className="flex gap-4">
                    <Card className="px-4 py-2 flex items-center gap-3 bg-white border-slate-200 shadow-sm">
                        <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                            <Clock size={16} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium uppercase">Time Saved This Week</div>
                            <div className="text-lg font-bold text-slate-800">2h 15m</div>
                        </div>
                    </Card>
                    <Card className="px-4 py-2 flex items-center gap-3 bg-white border-slate-200 shadow-sm">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <BarChart size={16} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 font-medium uppercase">Avg Edit Rate</div>
                            <div className="text-lg font-bold text-slate-800">12%</div>
                        </div>
                    </Card>
                </div>
            </div>

            <Card>
                <div className="divide-y divide-slate-100">
                    {visits.map((visit) => (
                        <div key={visit.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                    {visit.patient[0]}
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-900">{visit.patient}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Badge variant="secondary" className="text-xs font-normal">{visit.type}</Badge>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {visit.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium text-slate-900">{visit.duration} duration</div>
                                    <div className="text-xs text-green-600 font-medium">Saved ~{visit.saved}</div>
                                </div>
                                <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
