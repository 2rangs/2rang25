import { scrollToSection } from '@/app/utils/scroll';

interface FooterProps {
    name: string;
    email: string;
    location: string;
}

const NAV_ITEMS = ['About', 'Tech Stack', 'Projects', 'Contact'];

export const Footer: React.FC<FooterProps> = ({ name, email, location }) => (
    <footer className="border-t border-zinc-800 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-sm text-zinc-400">Frontend Developer</p>
                    <p className="text-xs text-zinc-500">
                        Designing experiences,<br />Building solutions.
                    </p>
                </div>

                <nav className="space-y-4">
                    <h3 className="text-sm font-medium text-zinc-400">Navigation</h3>
                    <ul className="space-y-2">
                        {NAV_ITEMS.map(item => (
                            <li key={item}>
                                <button
                                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-zinc-400">Connect</h3>
                    <address className="not-italic space-y-2 text-sm text-zinc-500">
                        <p>{email}</p>
                        <p>{location}</p>
                        <p className="text-xs pt-2">Available for projects</p>
                    </address>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                <p>© 2026 {name}. All rights reserved.</p>
                <p>Designed with intention, built with care.</p>
            </div>
        </div>
    </footer>
);