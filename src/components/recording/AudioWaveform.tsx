import React, { useEffect, useState } from 'react';

export const AudioWaveform: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    const [bars, setBars] = useState<number[]>(Array(40).fill(10));

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setBars(prev => prev.map(() => Math.max(10, Math.floor(Math.random() * 60) + 10)));
        }, 100);

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className="flex items-center justify-center gap-[3px] h-20 w-full overflow-hidden">
            {bars.map((height, i) => (
                <div
                    key={i}
                    className="w-1.5 bg-teal-500 rounded-full transition-all duration-100 ease-in-out"
                    style={{ height: `${height}%`, opacity: isActive ? 1 : 0.4 }}
                />
            ))}
        </div>
    );
};
