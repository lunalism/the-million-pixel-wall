'use client'

import { useState } from 'react'

type FAQItem = {
  question: string
  answer: string
}

const faqList: FAQItem[] = [
  {
    question: "What is The Million Pixel Wall?",
    answer: "It's a collaborative digital canvas where people can purchase and customize pixels with images and messages, inspired by the Million Dollar Homepage.",
  },
  {
    question: "How do I buy a pixel?",
    answer: "Click on an empty pixel, fill out the form with your image, name, and message, and confirm your purchase. That’s it!",
  },
  {
    question: "Do I need an account to participate?",
    answer: "No account is required. You can join and leave your mark as a guest. Just upload and go!",
  },
]

export default function AccordionFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
      {faqList.map((item, index) => (
        <div
          key={index}
          className="border border-white/10 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left px-4 py-3 bg-neutral-900 hover:bg-neutral-800 transition flex justify-between items-center"
          >
            <span className="font-medium text-white">{item.question}</span>
            <span className="text-white/50">{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="px-4 py-3 text-white/80 bg-neutral-800 border-t border-white/10">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
