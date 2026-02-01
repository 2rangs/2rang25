interface ContactProps {
    email: string;
    github: string;
}

export const Contact: React.FC<ContactProps> = ({ email, github }) => (
    <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-6 py-32 bg-zinc-900 text-white relative overflow-hidden"
    >
        {/* Background Image */}
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: 'url(/assets/images/reze_1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.25
            }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <header className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold">
                    Let&apos;s Build Together
                </h2>
                <p className="text-xl text-zinc-400">
                    좋은 제품을 만드는 여정에 동행하겠습니다
                </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                href={`mailto:${email}`}
                className="px-8 py-4 bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors"
                >
                이메일 보내기 →
            </a>
            <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-zinc-900 transition-colors"
            >
            GitHub ↗</a>
    </div>
</div>
</section>
);