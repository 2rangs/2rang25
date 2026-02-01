import { SectionId } from '@/app/types/portfolio';

interface NavigationProps {
    sections: SectionId[];
    activeSection: SectionId;
    onNavigate: (section: SectionId) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
                                                          sections,
                                                          activeSection,
                                                          onNavigate
                                                      }) => (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-3">
        {sections.map((section) => (
            <button
                key={section}
                onClick={() => onNavigate(section)}
                aria-label={`Navigate to ${section}`}
                className="block"
            >
                <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSection === section
                            ? 'bg-zinc-900 scale-150'
                            : 'bg-zinc-300 hover:bg-zinc-500'
                    }`}
                />
            </button>
        ))}
    </nav>
);