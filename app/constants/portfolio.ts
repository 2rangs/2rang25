import { Project, Philosophy, TechCategory,SectionId } from '@/app/types/portfolio';

export const SECTIONS: SectionId[] = ['hero', 'about', 'stack', 'projects', 'contact'];

export const PROJECTS: Project[] = [
    {
        index: 1,
        title: "도로 손상 감지 시스템",
        year: "2024",
        description: "듀얼 AI 모델 결과를 투명하게 시각화",
        tech: ["Vue.js", "OpenLayers", "TypeScript"],
        impact: "판단 근거가 명확한 인프라 모니터링"
    },
    {
        index: 2,
        title: "차량 추적 대시보드",
        year: "2023",
        description: "실시간 위치 데이터의 직관적 시각화",
        tech: ["Vue.js", "deck.gl", "MapLibre"],
        impact: "복잡한 데이터, 심플한 인터페이스"
    },
    {
        index: 3,
        title: "야구 라인업 시스템",
        year: "2023",
        description: "시너지 계산을 심플한 UX로",
        tech: ["Vue.js", "Algorithm", "UI/UX"],
        impact: "복잡성을 숨기고 본질에 집중"
    }
];

export const PHILOSOPHIES: Philosophy[] = [
    {
        id: "01",
        title: "사용자 중심 설계",
        description: "사용자가 고민하지 않아도 되는 흐름을 먼저 설계합니다."
    },
    {
        id: "02",
        title: "주도적인 AI 활용",
        description: "AI에 의존하지 않고, 판단과 책임은 스스로 내립니다."
    },
    {
        id: "03",
        title: "경험 중심 완성도",
        description: "기능은 빠르게 만들 수 있지만, 경험은 시간과 노력으로 완성됩니다"
    },
    {
        id: "04",
        title: "지속적인 개선",
        description: "완성에 머무르지 않고, 더 나은 방향을 계속 탐색합니다."
    }
];


export const TECH_STACK: TechCategory[] = [
    {
        name: "frontend",
        items: ["Vue.js", "React", "TypeScript","JavaScript", "TailwindCSS"]
    },
    {
        name: "backend",
        items: ["Python", "FastAPI"]
    }
];

export const CONTACT_INFO = {
    email: "2_rang25@naver.com",
    github: "https://github.com/2rangs",
    location: "Sowon-si, South Korea of Republic"
};