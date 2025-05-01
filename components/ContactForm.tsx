// components/ContactForm.tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  // 입력값 상태 관리
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [agree, setAgree] = useState(false)

  // 입력 에러 관리
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 이메일 유효성 검사 정규표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // 이메일 검사 함수
  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
      setEmailError('❗ Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  // 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !name || !subject || !message || !agree || emailError) {
      alert('Please fill out all fields correctly.')
      return
    }

    try {
      setIsSubmitting(true)

      // 여기서 메일 전송 API 호출 로직 추가 예정
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 모의 전송

      alert('✅ Your inquiry has been successfully sent!')
      setEmail('')
      setName('')
      setSubject('')
      setMessage('')
      setAgree(false)
    } catch (error) {
      alert('❌ Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Need Helps?</h2>
      {/* 이메일 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className={`w-full rounded-lg px-4 py-2 border bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            emailError ? 'border-red-500' : 'border-white/20'
          }`}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            validateEmail(e.target.value)
          }}
        />
        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
      </div>

      {/* 이름 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input
          type="text"
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* 메시지 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* 수신 동의 체크박스 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="accent-blue-500"
        />
        <label htmlFor="agree" className="text-sm">
          I agree to receive information via email.
        </label>
      </div>

      {/* 전송 버튼 */}
      <div>
        <button
          type="submit"
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
            !email || !name || !subject || !message || !agree || emailError
              ? 'bg-blue-500/30 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          disabled={!email || !name || !subject || !message || !agree || !!emailError || isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}
