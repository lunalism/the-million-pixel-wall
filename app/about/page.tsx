'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchAbout } from '@/lib/fetchAbout'
import { useLanguage } from '@/context/languageContext'
import { SiNextdotjs, SiTailwindcss, SiSupabase, SiVercel, SiSentry } from "react-icons/si"
import { Cursor } from "@lobehub/icons"

export default function AboutPage() {

    const { language } = useLanguage() // 현재 언어 가져오기
    const [projectContent, setProjectContent] = useState<string[]>([])
    const [languageContent, setLanguageContent] = useState<string[]>([])
    const [loadingProject, setLoadingProject] = useState(true)
    const [loadingLanguage, setLoadingLanguage] = useState(true)
    const [loading, setLoading] = useState(true)

    // 📌 현재 선택된 탭 상태 ('project' | 'tech' | 'credit' | ...)
    const [activeTab, setActiveTab] = useState<'project' | 'language' | 'tech' | 'credit'>('project')

    // 📦 Project 탭 데이터 불러오기
    useEffect(() => {
        async function loadAbout() {
        setLoading(true)
        const data = await fetchAbout(language, 'project')
        if (data) {
            // ✨ content를 <p> 단위로 분리해서 배열로 만들기
            const paragraphs = data.content
            .split(/<\/p>\s*<p>/g) // </p><p> 기준으로 나누고
            .map((p: string) => p.replace(/^<p>|<\/p>$/g, '')) // 앞뒤 <p> 태그 제거
            setProjectContent(paragraphs)
        }
        setLoading(false)
        }
        loadAbout()
    }, [language])

    // 🚀 Multilingual 탭 데이터 불러오기
    useEffect(() => {
        async function loadLanguage() {
        setLoadingLanguage(true)
        const data = await fetchAbout(language, 'language')
        if (data) {
            const paragraphs = data.content
            .split(/<\/p>\s*<p>/g)
            .map((p: string) => p.replace(/^<p>|<\/p>$/g, ''))
            setLanguageContent(paragraphs)
        }
        setLoadingLanguage(false)
        }
        loadLanguage()
    }, [language])

    return (
        <>
            <HeroSection />
            <div className="bg-neutral-800 text-white min-h-screen px-6 py-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                
                    {/* 🔹 왼쪽: 탭 메뉴 */}
                    <div className="space-y-4 text-sm font-medium">
                        <TabButton
                        label="🧱 Project"
                        isActive={activeTab === 'project'}
                        onClick={() => setActiveTab('project')}
                        />
                        <TabButton
                        label="🌐 Multilingual"
                        isActive={activeTab === 'language'}
                        onClick={() => setActiveTab('language')}
                        />
                        <TabButton
                        label="⚙️ Technology"
                        isActive={activeTab === 'tech'}
                        onClick={() => setActiveTab('tech')}
                        />
                        <TabButton
                        label="💬 Credits"
                        isActive={activeTab === 'credit'}
                        onClick={() => setActiveTab('credit')}
                        />
                    </div>

                    {/* 🔹 오른쪽: 내용 */}
                    <div className="md:col-span-3 text-white/80 space-y-6 text-base leading-relaxed">
                        {activeTab === 'project' && (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">The Project</h2>

                                {/* 📚 로딩 중 */}
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    projectContent.map((paragraph, index) => (
                                        <div
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: paragraph }}
                                        />
                                    ))
                                )}
                            </>
                        )}
                        {/* 🌐 Multilingual 탭 */}
                        {activeTab === 'language' && (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">Multilingual Support</h2>
                                {loadingLanguage ? (
                                    <p>Loading...</p>
                                ) : (
                                    languageContent.map((paragraph, index) => (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                                    ))
                                )}
                            </>
                        )}
                        {activeTab === 'tech' && (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
                                <div className="flex flex-col gap-4 text-white/80 text-base">
                                    {/* Next.js */}
                                    <div className="flex items-center gap-3">
                                        <SiNextdotjs className="w-6 h-6 text-white/80" />
                                        <span>Next.js 14 with App Router</span>
                                    </div>

                                    {/* Tailwind CSS */}
                                    <div className="flex items-center gap-3">
                                        <SiTailwindcss className="w-6 h-6 text-white/80" />
                                        <span>Tailwind CSS for styling</span>
                                    </div>

                                    {/* Supabase */}
                                    <div className="flex items-center gap-3">
                                        <SiSupabase className="w-6 h-6 text-white/80" />
                                        <span>Supabase (Database, Auth, Storage)</span>
                                    </div>

                                    {/* Vercel */}
                                    <div className="flex items-center gap-3">
                                        <SiVercel className="w-6 h-6 text-white/80" />
                                        <span>Vercel for hosting and deployment</span>
                                    </div>

                                    {/* Sentry */}
                                    <div className="flex items-center gap-3">
                                        <SiSentry className="w-6 h-6 text-white/80" />
                                        <span>Sentry for error monitoring</span>
                                    </div>

                                    {/* Cursor AI */}
                                    <div className="flex items-center gap-3">
                                        <Cursor className="w-6 h-6 text-white/80" />
                                        <span>Cursor AI as the main code editor</span>
                                    </div>
                                </div>
                                {/* 📌 특별한 설계 포인트 */}
                                <div className="mt-12">
                                    <h3 className="text-xl font-bold text-white mb-4">Special Design Highlights</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80 text-base">
                                        {/* 디자인 포인트 항목들 */}
                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Real-time Pixel Rendering</h4>
                                            <p>Purchased pixels are immediately updated without page reloads, ensuring a seamless user experience.</p>
                                        </div>

                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Multilingual by Default</h4>
                                            <p>From launch, the project supports 11+ languages, not just translated later but designed multilingual from the ground up.</p>
                                        </div>

                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Image Upload & CDN Optimization</h4>
                                            <p>Uploaded images are optimized and served through Supabase CDN, ensuring fast load times globally.</p>
                                        </div>

                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Pixel Ownership Metadata</h4>
                                            <p>Each pixel stores owner name, message, and purchase date — enriching the wall with human stories, not just images.</p>
                                        </div>

                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Designed for Scalability</h4>
                                            <p>Structured to support future features like community feeds, advanced editing, and social interactions without refactoring.</p>
                                        </div>

                                        <div className="border border-white/10 rounded-lg p-4">
                                            <h4 className="font-semibold text-white mb-2">Modern Developer Stack</h4>
                                            <p>Next.js 14 + Tailwind CSS + Supabase + Sentry + Cursor AI. Designed to be fast, efficient, and developer-friendly.</p>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}
                        {activeTab === 'credit' && (
                            <>
                                <h2 className="text-2xl font-bold text-white">Credits</h2>
                                <p>
                                    This playful-yet-ambitious digital monument was created by Chris (aka Chrisholic) and GPT —  
                                    to celebrate the legacy of early internet creativity in a modern, global, and pixel-perfect way.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* 🔹 하단 크레딧 */}
                <footer className="text-sm text-white/50 italic text-center pt-16 border-t border-white/10 mt-20">
                    Built with ❤️ by Chris and GPT — 20 years after the original.
                </footer>
            </div>
        </>
    )
}

// 🔧 탭 버튼 컴포넌트
function TabButton({ label, isActive, onClick }: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
    return (
        <button
        onClick={onClick}
        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-white text-black font-semibold' : 'hover:bg-white/10 text-white/80'
        }`}
        >
            {label}
        </button>
    )
}
