import { useState, useEffect } from 'react';
import { SectionId } from '@/app/types/portfolio';

export const useScrollSpy = (sections: SectionId[]): SectionId => {
    const [activeSection, setActiveSection] = useState<SectionId>(sections[0]);

    useEffect(() => {
        const handleScroll = () => {
            const current = sections.find(id => {
                const element = document.getElementById(id);
                if (!element) return false;
                const { top, bottom } = element.getBoundingClientRect();
                return top <= 100 && bottom >= 100;
            });

            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return activeSection;
};