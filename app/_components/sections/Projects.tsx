import { Project } from '@/app/types/portfolio';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
    projects: Project[];
    isVisible?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, isVisible = true }) => (
    <section
        id="projects"
        className="py-32 px-6  text-black"
    >
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-20">
                <h2 className="text-sm font-mono text-zinc-400 tracking-wider mb-12">
                    SELECTED WORKS
                </h2>
                <div className="w-16 h-0.5 bg-black" />
            </div>

            {/* 2x2 Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project} index={i} />
                ))}
            </div>

            {/* Stats */}
            <div className="mt-20 pt-12 border-t border-zinc-200">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        {projects.length} selected projects
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-zinc-300" />
                        <span className="text-xs font-mono text-zinc-400">2021—2024</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);