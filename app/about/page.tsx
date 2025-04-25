'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'

export default function AboutPage() {
  // 📌 현재 선택된 탭 상태 ('project' | 'tech' | 'credit' | ...)
  const [activeTab, setActiveTab] = useState<'project' | 'language' | 'tech' | 'credit'>('project')

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
                <h2 className="text-2xl font-bold text-white">The Project</h2>
                <p>
                  The Million Pixel Wall is a modern tribute to the 2005 Million Dollar Homepage.
                  It offers users the ability to purchase pixels, upload images, and leave a permanent mark on the web.
                </p>
                <p>
                  Unlike the original, this wall is interactive, accessible, and designed for the global community.
                </p>
              </>
            )}
            {activeTab === 'language' && (
              <>
                <h2 className="text-2xl font-bold text-white">Multilingual Support</h2>
                <p>
                  This project supports 11+ languages including English, Korean, Japanese, Chinese, Spanish, German,
                  French, Portuguese (PT/BR), Italian, and Finnish.
                </p>
                <p>
                  Visitors can switch languages via the dropdown, and each pixel purchase includes language-specific metadata.
                </p>
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
