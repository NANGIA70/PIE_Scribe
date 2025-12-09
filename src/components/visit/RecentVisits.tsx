import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const RecentVisits: React.FC = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                    <Clock size={18} className="text-slate-400" />
                    Recent Visits
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-500">View All</Button>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-slate-100">
                    {[1, 2].map((i) => (
                        <div key={i} className="py-3 flex items-center justify-between group cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
                            <div>
                                <div className="font-medium text-slate-900">Sarah Johnson</div>
                                <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                    <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">URI / Cough</span>
                                    <span>•</span>
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
