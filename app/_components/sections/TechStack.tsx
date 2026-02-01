'use client';

import { TechCategory } from '@/app/types/portfolio';
import { useState } from 'react';

interface TechStackProps {
    categories: TechCategory[];
    isVisible?: boolean;
}

export const TechStack: React.FC<TechStackProps> = ({ categories, isVisible = true }) => {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const allTechs = categories.flatMap(({ name, items }) =>
        items.map(item => ({ item, category: name }))
    );

    const filteredTechs = selectedCategory
        ? allTechs.filter(t => t.category === selectedCategory)
        : allTechs;

    return (
        <section
            id="stack"
            className="py-32 px-6  text-black border-t border-zinc-200"
        >
            <div className="max-w-6xl mx-auto">
                {/* Simple Header */}
                <div className="mb-20">
                    <h2 className="text-sm font-mono text-zinc-400 tracking-wider mb-12">
                        TECH STACK
                    </h2>
                    <div className="w-16 h-0.5 bg-black" />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-16">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
                            !selectedCategory
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black border-zinc-300 hover:border-black'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(({ name }) => (
                        <button
                            key={name}
                            onClick={() => setSelectedCategory(name)}
                            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-all ${
                                selectedCategory === name
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-zinc-300 hover:border-black'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredTechs.map(({ item, category }) => {
                        const isHovered = hoveredTech === item;

                        return (
                            <div
                                key={`${category}-${item}`}
                                onMouseEnter={() => setHoveredTech(item)}
                                onMouseLeave={() => setHoveredTech(null)}
                                className="group"
                            >
                                <div className={`
                                    p-6 border border-zinc-200
                                    bg-white
                                    transition-all duration-300
                                    ${isHovered ? 'border-black bg-zinc-50' : ''}
                                `}>
                                    {/* Category */}
                                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-4">
                                        {category}
                                    </div>

                                    {/* Tech Name */}
                                    <h3 className="text-xl font-bold tracking-tight mb-3">
                                        {item}
                                    </h3>

                                    {/* Underline */}
                                    <div className={`h-px bg-black transition-all duration-500 ${
                                        isHovered ? 'w-full' : 'w-8'
                                    }`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};