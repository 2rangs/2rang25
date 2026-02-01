export interface Project {
    index: number;
    title: string;
    year: string;
    description: string;
    tech: string[];
    impact: string;
}

export interface Philosophy {
    id: string;
    title: string;
    description: string;
}

export interface TechCategory {
    name: string;
    items: string[];
}

export type SectionId = 'hero' | 'about' | 'stack' | 'projects' | 'contact';