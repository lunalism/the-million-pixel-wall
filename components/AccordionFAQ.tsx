'use client'

import { useEffect, useState } from 'react'
import { fetchFaq, FaqItem } from '@/lib/fetchFaq'
import { useLanguage } from '@/context/languageContext'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function AccordionFAQ() {
  const { language } = useLanguage()
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const isRTL = language === 'ar' // 🔁 아랍어일 경우 RTL 적용

  useEffect(() => {
    async function loadFaqs() {
      setLoading(true)
      const data = await fetchFaq(language)
      setFaqs(data)
      setLoading(false)
    }
    loadFaqs()
  }, [language])

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div
      className={`space-y-4 ${isRTL ? 'text-right' : ''}`}
      dir={isRTL ? 'rtl' : undefined} // ✅ RTL direction 설정
    >
      <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
      {loading ? (
          <p className="text-sm text-white/60">Loading FAQs...</p>
      ) : (
          faqs.map((faq, index) => (
          <div key={faq.id} className="border border-white/10 rounded-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full px-4 py-3 flex justify-between items-center text-white font-medium bg-white/5 hover:bg-white/10 rounded-t-lg transition ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}
              >
                  {faq.question}
                  <ChevronDownIcon
                    className={`w-4 h-4 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-white/80 border-t border-white/10 text-sm leading-relaxed bg-white/5 rounded-b-lg">
                    {faq.answer}
                </div>
              )}
          </div>
        ))
      )}
    </div>
  )
}
