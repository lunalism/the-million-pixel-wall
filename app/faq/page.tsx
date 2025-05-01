'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import ContactForm from '@/components/ContactForm'
import AccordionFAQ from '@/components/AccordionFAQ'

export default function FAQPage() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  const handleSubmit = () => {
    if (!consent || !email || !subject || !message) return
    alert('Your inquiry has been successfully submitted! We will get back reply as soon as possible!')
  }

  return (
    <>
      <HeroSection />
      <div className="bg-neutral-800 text-white min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* 🔹 Left: Inquiry Form */}
          <ContactForm />

          {/* 🔹 Right: FAQ Accordion */}
          <AccordionFAQ />

        </div>

        {/* 🔹 Footer */}
        <footer className="text-sm text-white/50 italic text-center pt-16 border-t border-white/10 mt-20">
          Built with ❤️ by Chris and GPT — 20 years after the original.
        </footer>
      </div>
    </>
  )
}
