'use client'

import { useEffect, useState } from 'react'
import { fetchFaq, FaqItem } from '@/lib/fetchFaq'
import { useLanguage } from '@/context/languageContext'

export default function AccordionFAQ() {
  const { language } = useLanguage()
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

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
    <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
        {loading ? (
            <p className="text-sm text-white/60">Loading FAQs...</p>
        ) : (
            faqs.map((faq, index) => (
            <div key={faq.id} className="border border-white/10 rounded-lg">
                <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 py-3 text-left text-white font-medium bg-white/5 hover:bg-white/10 rounded-t-lg transition"
                >
                    {faq.question}
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
