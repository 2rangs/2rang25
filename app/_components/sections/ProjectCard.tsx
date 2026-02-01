'use client';

import { Project } from '@/app/types/portfolio';
import { useState } from 'react';

export const ProjectCard: React.FC<Project & { index: number }> = ({
                                                                       title,
                                                                       year,
                                                                       description,
                                                                       tech,
                                                                       impact,
                                                                       index
                                                                   }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group py-12 border-t border-zinc-200 first:border-t-0"
        >
            <div className="grid md:grid-cols-12 gap-8">
                {/* Left: Number & Year */}
                <div className="md:col-span-2 space-y-4">
                    <div className={`
                        text-6xl font-black transition-colors duration-500
                        ${isHovered ? 'text-black' : 'text-zinc-100'}
                    `}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                    <time className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {year}
                    </time>
                </div>

                {/* Right: Content */}
                <div className="md:col-span-10 space-y-6">
                    {/* Title */}
                    <h3 className="text-3xl font-bold tracking-tight">
                        {title}
                    </h3>

                    {/* Underline */}
                    <div className={`
                        h-px bg-black transition-all duration-500
                        ${isHovered ? 'w-full' : 'w-16'}
                    `} />

                    {/* Description */}
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        {description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {tech.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 text-xs font-medium border border-zinc-300 text-zinc-700"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Impact */}
                    <div className="flex items-start gap-3 pt-2">
                        <span className="text-zinc-400">→</span>
                        <p className="text-sm text-zinc-500">
                            {impact}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};