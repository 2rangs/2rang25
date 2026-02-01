import { useState, useEffect } from 'react';

export const useIntersectionObserver = (elementIds: string[]) => {
    const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const updates: Record<string, boolean> = {};
                entries.forEach((entry) => {
                    updates[entry.target.id] = entry.isIntersecting;
                });
                setVisibleElements(prev => ({ ...prev, ...updates }));
            },
            { threshold: 0.1 }
        );

        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [elementIds]);

    return visibleElements;
};