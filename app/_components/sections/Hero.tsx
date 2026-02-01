interface HeroProps {
    name: string;
    tagline: string;
    startYear: string;
    values: string[];
    profileImage: string;
}

export const Hero: React.FC<HeroProps> = ({
                                              name,
                                              tagline,
                                              startYear,
                                              values,
                                              profileImage
                                          }) => (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Profile Image */}
            <div className="flex justify-center md:justify-end">
                <div className="relative">
                    {/* Decorative border */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-zinc-200 to-zinc-100 rounded-2xl rotate-3" />

                    {/* Profile Image */}
                    <div className="relative rounded-2xl overflow-hidden w-80 h-80 border-4 border-white shadow-2xl">
                        <img
                            src={profileImage}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-4 -right-4 bg-zinc-900 text-white px-6 py-3 rounded-full shadow-lg">
                        <span className="text-sm font-medium">Since {startYear}</span>
                    </div>
                </div>
            </div>

            {/* Right: Text Content */}
            <div className="space-y-8">
                <div className="space-y-4">
                    <p className="text-sm font-medium text-zinc-500 tracking-wider uppercase">
                        Frontend Developer
                    </p>
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                        {name}
                    </h1>
                    <p className="text-2xl text-zinc-600 font-light">
                        {tagline}
                    </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-200">
                    {values.map((value, i) => (
                        <p key={i} className="text-zinc-600 flex items-start gap-3">
                            <span className="text-zinc-400 mt-1.5">→</span>
                            <span>{value}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-zinc-400">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-300 to-transparent" />
        </div>
    </section>
);