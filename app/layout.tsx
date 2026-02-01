import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-playfair",
    display: "swap",
});

const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-work-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Yi-Rang | Frontend Developer",
    description: "사용자 경험을 중요시하는 프론트엔드 개발자. 투명한 프로세스로 기술을 활용합니다.",
    keywords: ["Frontend Developer", "Vue.js", "React", "TypeScript", "UI/UX", "Yi-Rang"],
    authors: [{ name: "Yi-Rang" }],
    openGraph: {
        title: "Yi-Rang | Frontend Developer",
        description: "사용자 경험을 중요시하는 프론트엔드 개발자",
        type: "website",
        locale: "ko_KR",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className="scroll-smooth">
        <body
            className={`${playfair.variable} ${workSans.variable} antialiased bg-zinc-50`}
        >
        {children}
        </body>
        </html>
    );
}