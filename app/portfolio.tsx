'use client';

import { Navigation } from '@/app/_components/Navigation';
import { Hero } from '@/app/_components/sections/Hero';
import { About } from '@/app/_components/sections/About';
import { TechStack } from '@/app/_components/sections/TechStack';
import { Projects } from '@/app/_components/sections/Projects';
import { Contact } from '@/app/_components/sections/Contact';
import { Footer } from '@/app/_components/sections/Footer';
import { Rain } from '@/app/_components/Rain';
import { useScrollSpy } from '@/app/hooks/useScrollSpy';
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver';
import { scrollToSection } from '@/app/utils/scroll';

import { SECTIONS, PROJECTS, PHILOSOPHIES, TECH_STACK, CONTACT_INFO } from '@/app/constants/portfolio';

export default function Portfolio() {
    const activeSection = useScrollSpy(SECTIONS);
    const isVisible = useIntersectionObserver(SECTIONS);

    return (
        <div className="bg-white text-zinc-900 font-sans antialiased relative">
            {/* Fixed Background Image */}
            <div
                className="fixed inset-0"
                style={{
                    backgroundImage: 'url(/assets/images/bg_city.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.9,  // 테스트용으로 높게
                    zIndex: 0
                }}
            />

            {/* Gradient Overlay */}
            <div
                className="fixed inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70"
                style={{ zIndex: 1 }}
            />

            {/* All Content */}
            <div className="relative" style={{ zIndex: 10 }}>
                <Rain />

                <Navigation
                    sections={SECTIONS}
                    activeSection={activeSection}
                    onNavigate={scrollToSection}
                />

                <Hero
                    name="Kim-Yi-Rang"
                    tagline="실패는 학습의 출발점이다."
                    startYear="November 2021"
                    profileImage="https://avatars.githubusercontent.com/u/107464775?v=4"
                    values={[
                        "좋은 화면은 설명이 필요 없다고 믿습니다.",
                        "편리함은 우연이 아니라 설계의 결과입니다.",
                        "성장은 작은 개선의 반복이라고 생각합니다."
                    ]}
                />

                <About
                    philosophies={PHILOSOPHIES}
                    isVisible={isVisible.about}
                />

                <TechStack
                    categories={TECH_STACK}
                    isVisible={isVisible.stack}
                />

                <Projects
                    projects={PROJECTS}
                    isVisible={isVisible.projects}
                />

                <Contact
                    email={CONTACT_INFO.email}
                    github={CONTACT_INFO.github}
                />

                <Footer
                    name="Yi-Rang"
                    email={CONTACT_INFO.email}
                    location={CONTACT_INFO.location}
                />
            </div>
        </div>
    );
}