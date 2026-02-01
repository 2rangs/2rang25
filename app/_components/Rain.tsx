'use client';

import { useEffect, useState } from 'react';

interface RainDrop {
    id: number;
    left: number;
    animationDelay: number;
    animationDuration: number;
}

export const Rain = () => {
    const [drops, setDrops] = useState<RainDrop[]>([]);

    useEffect(() => {
        const rainDrops: RainDrop[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDelay: Math.random() * 2,
            animationDuration: 0.8 + Math.random() * 0.4
        }));

        setDrops(rainDrops);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
            {drops.map((drop) => (
                <div
                    key={drop.id}
                    className="absolute animate-rain"
                    style={{
                        left: `${drop.left}%`,
                        top: '-100px',
                        width: '1px',
                        height: '100px',
                        background: 'linear-gradient(to bottom, transparent, rgba(161, 161, 170, 0.4), transparent)',
                        animationDelay: `${drop.animationDelay}s`,
                        animationDuration: `${drop.animationDuration}s`,
                    }}
                />
            ))}
        </div>
    );
};