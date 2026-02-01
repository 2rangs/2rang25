import { Philosophy } from '@/app/types/portfolio';

interface AboutProps {
    philosophies: Philosophy[];
    isVisible: boolean;
}

export const About: React.FC<AboutProps> = ({ philosophies, isVisible }) => (
    <section
        id="about"
        className={`py-32 px-6 border-t border-zinc-200 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
        <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-medium text-zinc-400 mb-16">Philosophy</h2>

            <div className="grid md:grid-cols-2 gap-16">
                {philosophies.map(({ id, title, description }) => (
                    <div key={id} className="space-y-4">
                        <div className="text-6xl font-bold text-zinc-200">{id}</div>
                        <h3 className="text-2xl font-semibold">{title}</h3>
                        <p className="text-zinc-600">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);