'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import ContactForm from '@/components/ContactForm'

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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            {/* Question 1 */}
            <details className="bg-neutral-700 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">How can I purchase a pixel?</summary>
              <p className="mt-2 text-sm text-white/80">
                Simply click on the pixel you want, fill out the purchase form, and complete the payment to claim your space.
              </p>
            </details>

            {/* Question 2 */}
            <details className="bg-neutral-700 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">How do I upload an image?</summary>
              <p className="mt-2 text-sm text-white/80">
                You can either enter an image URL or upload a file directly when filling out the purchase form.
              </p>
            </details>

            {/* Question 3 */}
            <details className="bg-neutral-700 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">Can I edit my pixel after purchase?</summary>
              <p className="mt-2 text-sm text-white/80">
                Currently, pixels cannot be edited after purchase. Update features may be added in the future but now this function not allowed.
              </p>
            </details>

            {/* Question 4 */}
            <details className="bg-neutral-700 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">How can I received after this project?</summary>
              <p className="mt-2 text-sm text-white/80">
                We will update in the "X (@lunalism)" platform. 
              </p>
            </details>
          </div>

        </div>

        {/* 🔹 Footer */}
        <footer className="text-sm text-white/50 italic text-center pt-16 border-t border-white/10 mt-20">
          Built with ❤️ by Chris and GPT — 20 years after the original.
        </footer>
      </div>
    </>
  )
}
