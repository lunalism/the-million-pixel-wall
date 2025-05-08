'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n' // 🌐 다국어 번역 훅

export default function ContactForm() {
  const { t } = useTranslation() // ✅ i18n 번역 함수 불러오기

  // ✅ 폼 입력값 상태
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [agree, setAgree] = useState(false)

  // ✅ 에러 및 제출 상태
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ✅ 이메일 유효성 검사용 정규표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // 📬 이메일 입력 시 유효성 검사
  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) {
      setEmailError(t('contact.invalid_email')) // ❗ 유효하지 않을 경우 메시지
    } else {
      setEmailError('')
    }
  }

  // 📩 폼 전송 이벤트 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ❌ 필수 항목 확인
    if (!email || !name || !subject || !message || !agree || emailError) {
      alert(t('contact.required')) // 🛑 필수 항목 알림
      return
    }

    try {
      setIsSubmitting(true)

      // 🔄 실제 API 전송 전 모의 대기
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ✅ 성공 메시지
      alert(t('contact.success'))

      // 🔄 입력 초기화
      setEmail('')
      setName('')
      setSubject('')
      setMessage('')
      setAgree(false)
    } catch (error) {
      alert(t('contact.error')) // ❌ 실패 메시지
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 📌 제목 */}
      <h2 className="text-2xl font-bold text-white mb-4">{t('contact.title')}</h2>
      <p className="text-white/70 mb-6">{t('contact.subtitle')}</p>

      {/* ✉️ 이메일 */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('contact.email')}</label>
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

      {/* 🙋‍♀️ 이름 */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('contact.name')}</label>
        <input
          type="text"
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('contact.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 📝 제목 */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('contact.subject')}</label>
        <input
          type="text"
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('contact.subject')}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* 💬 메시지 */}
      <div>
        <label className="block text-sm font-medium mb-1">{t('contact.message')}</label>
        <textarea
          className="w-full rounded-lg px-4 py-2 border border-white/20 bg-neutral-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('contact.message')}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* ✅ 정보 수신 동의 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="accent-blue-500"
        />
        <label htmlFor="agree" className="text-sm">
          {t('contact.consent')}
        </label>
      </div>

      {/* 🚀 전송 버튼 */}
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
          {isSubmitting ? t('contact.sending') || 'Sending...' : t('contact.submit')}
        </button>
      </div>
    </form>
  )
}
