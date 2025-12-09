import React, { useEffect, useState } from 'react';
// import { differenceInSeconds } from 'date-fns';

export const RecordingTimer: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="font-mono text-5xl font-semibold tracking-widest text-slate-800">
            {formatTime(elapsed)}
        </div>
    );
};
