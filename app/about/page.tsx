'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchAbout } from '@/lib/fetchAbout'
import { useLanguage } from '@/context/languageContext'

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
                            <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
                            <ul className="list-disc list-inside">
                            <li>🔧 Next.js 14 with App Router</li>
                            <li>🎨 Tailwind CSS for styling</li>
                            <li>💾 Supabase for database, auth, and storage</li>
                            <li>🌐 i18n context + custom multilingual routing</li>
                            </ul>
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
