'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'

export default function FAQPage() {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  const handleSubmit = () => {
    if (!consent || !email || !subject || !message) return
    alert('Your inquiry has been successfully submitted!')
  }

  return (
    <>
      <HeroSection />
      <div className="bg-neutral-800 text-white min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* 🔹 Left: Inquiry Form */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <input 
                type="email"
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-transparent text-white placeholder-white/50"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Subject</label>
              <input 
                type="text"
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-transparent text-white placeholder-white/50"
                placeholder="Enter the subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-transparent text-white placeholder-white/50"
                placeholder="Write your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="accent-blue-500"
              />
              <label htmlFor="consent" className="text-sm text-white/80">
                I agree to receive information related to this inquiry.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={!consent || !email || !subject || !message}
              className={`w-full py-2 rounded-md text-sm font-semibold transition ${
                !consent || !email || !subject || !message
                  ? 'bg-blue-500/50 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Submit
            </button>
          </div>

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
                Currently, pixel information cannot be edited after purchase. Update features may be added in the future.
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
