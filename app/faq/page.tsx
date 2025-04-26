'use client'

import HeroSection from '@/components/HeroSection'
import { useState } from 'react'
import { fetchFaq } from '@/lib/fetchFaq'

export default function FaqPage() {
  // 아코디언 열림/닫힘 상태 관리
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // 더미 FAQ (나중에 fetchFaq로 불러오기 가능)
  const faqs = [
    {
      question: 'How can I purchase pixels?',
      answer: 'Simply click on an empty pixel on the canvas, fill out your details, and complete your purchase!'
    },
    {
      question: 'What happens after I upload an image?',
      answer: 'Your uploaded image will be displayed on the pixel board, resized automatically to fit your purchased space.'
    },
    {
      question: 'Can I edit my pixel after purchasing?',
      answer: 'Currently, edits are not supported after purchase. Please double-check your image and information before completing the purchase.'
    }
  ]

  return (
    <>
      <HeroSection />
      <div className="bg-neutral-800 text-white min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* 🔹 왼쪽: 문의 영역 */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Need Help?</h2>
            <p className="text-white/80 text-base">
              If you have any other questions, feel free to reach out to us!
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition"
            >
              📩 Contact Us via Email
            </a>
          </div>

          {/* 🔹 오른쪽: FAQ 아코디언 */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-lg">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span>{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="px-4 py-3 text-sm text-white/80 border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
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
