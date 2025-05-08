'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import { fetchAbout, AboutItem } from '@/lib/fetchAbout'
import { useLanguage } from '@/context/languageContext'
import { iconMap } from '@/lib/iconMap'

export default function AboutPage() {
  const { language } = useLanguage()

  // 📚 탭별 상태 관리
  const [projectContent, setProjectContent] = useState<string[]>([])
  const [languageContent, setLanguageContent] = useState<string[]>([])
  const [creditContent, setCreditContent] = useState<string[]>([])
  const [creditTitle, setCreditTitle] = useState<string>('Credits')
  const [techStacks, setTechStacks] = useState<AboutItem[]>([])
  const [highlights, setHighlights] = useState<AboutItem[]>([])

  const [loadingProject, setLoadingProject] = useState(true)
  const [loadingLanguage, setLoadingLanguage] = useState(true)
  const [loadingCredit, setLoadingCredit] = useState(true)
  const [loadingTech, setLoadingTech] = useState(true)
  const [loadingHighlight, setLoadingHighlight] = useState(true)

  const [activeTab, setActiveTab] = useState<'project' | 'language' | 'tech' | 'credit'>('project')

  // 🔹 Project 불러오기
  useEffect(() => {
    async function loadProject() {
      setLoadingProject(true)
      const data = await fetchAbout(language, 'project')
      if (data && 'content' in data) {
        const paragraphs = data.content
          .split(/<\/p>\s*<p>/g)
          .map((p: string) => p.replace(/^<p>|<\/p>$/g, ''))
        setProjectContent(paragraphs)
      }
      setLoadingProject(false)
    }
    loadProject()
  }, [language])

  // 🔹 Multilingual 불러오기
  useEffect(() => {
    async function loadLanguage() {
      setLoadingLanguage(true)
      const data = await fetchAbout(language, 'language')
      if (data && 'content' in data) {
        const paragraphs = data.content
          .split(/<\/p>\s*<p>/g)
          .map((p: string) => p.replace(/^<p>|<\/p>$/g, ''))
        setLanguageContent(paragraphs)
      }
      setLoadingLanguage(false)
    }
    loadLanguage()
  }, [language])

  // 🔹 Tech Stack 불러오기
  useEffect(() => {
    async function loadTechStacks() {
      setLoadingTech(true)
      const data = await fetchAbout(language, 'tech', 'stack')
      if (Array.isArray(data)) {
        setTechStacks(data)
      }
      setLoadingTech(false)
    }
    loadTechStacks()
  }, [language])

  // 🔹 Highlight 불러오기
  useEffect(() => {
    async function loadHighlights() {
      setLoadingHighlight(true)
      const data = await fetchAbout(language, 'tech', 'highlight')
      if (Array.isArray(data)) {
        setHighlights(data)
      }
      setLoadingHighlight(false)
    }
    loadHighlights()
  }, [language])

  // 🔹 Credit 불러오기
  useEffect(() => {
    async function loadCredit() {
      setLoadingCredit(true)
      const data = await fetchAbout(language, 'credit')
      if (data && 'content' in data) {
        setCreditTitle(data.title || 'Credits')
        const paragraphs = data.content
          .split(/<\/p>\s*<p>/g)
          .map((p: string) => p.replace(/^<p>|<\/p>$/g, ''))
        setCreditContent(paragraphs)
      }
      setLoadingCredit(false)
    }
    loadCredit()
  }, [language])

  return (
    <>
      <HeroSection />
      <div className="bg-neutral-800 text-white min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* 🔹 왼쪽: 탭 메뉴 */}
          <div className="space-y-4 text-sm font-medium">
            <TabButton label="🧱 Project" isActive={activeTab === 'project'} onClick={() => setActiveTab('project')} />
            <TabButton label="🌐 Multilingual" isActive={activeTab === 'language'} onClick={() => setActiveTab('language')} />
            <TabButton label="⚙️ Technology" isActive={activeTab === 'tech'} onClick={() => setActiveTab('tech')} />
            <TabButton label="💬 Credits" isActive={activeTab === 'credit'} onClick={() => setActiveTab('credit')} />
          </div>

          {/* 🔹 오른쪽: 탭별 내용 */}
          <div
            className={`md:col-span-3 space-y-6 text-base leading-relaxed text-white/80 ${
              language === 'ar' ? 'text-right' : ''
            }`}
            dir={language === 'ar' ? 'rtl' : undefined}
          >

            {/* 🧱 Project 탭 */}
            {activeTab === 'project' && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">The Project</h2>
                {loadingProject ? (
                  <p>Loading...</p>
                ) : (
                  projectContent.map((paragraph, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
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
                  languageContent.map((paragraph, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))
                )}
              </>
            )}

            {/* ⚙️ Technology 탭 */}
            {activeTab === 'tech' && (
              <>
                {/* 🚀 사용 기술 */}
                <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
                <div className="flex flex-col gap-4 text-white/80 text-base">
                  {loadingTech ? (
                    <p>Loading...</p>
                  ) : (
                    techStacks.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {item.icon && iconMap[item.icon] ? iconMap[item.icon] : null}
                          <span className="font-semibold">{item.title}</span>
                        </div>
                        <div className="flex-1 text-right text-m text-white/80">{item.content}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* 🎯 특별한 설계 포인트 */}
                <div className="mt-12">
                  <h2 className="text-xl font-bold text-white mb-4">Special Design Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80 text-base">
                    {loadingHighlight ? (
                      <p>Loading...</p>
                    ) : (
                      highlights.map((item, idx) => (
                        <div key={idx} className="border border-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                          <p>{item.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* 💬 Credits 탭 */}
            {activeTab === 'credit' && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">{creditTitle}</h2>
                {loadingCredit ? (
                  <p>Loading...</p>
                ) : (
                  creditContent.map((paragraph, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* 🔹 하단 푸터 */}
        <footer className="text-sm text-white/50 italic text-center pt-16 border-t border-white/10 mt-20">
          Built with ❤️ by Chris and GPT — 20 years after the original.
        </footer>
      </div>
    </>
  )
}

// 🔧 탭 버튼 컴포넌트
function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
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
