'use client'

import { useState } from 'react'

type FAQItem = {
  question: string
  answer: string
}

const faqList: FAQItem[] = [
    {
        question: '어떻게 픽셀을 구매하나요?',
        answer:
          '캔버스에서 원하는 픽셀을 클릭한 후, 이미지와 메시지를 입력하고 구매 정보를 작성하시면 됩니다. Google 로그인이 필요하며, 익명으로는 구매하실 수 없습니다.',
    },
    {
        question: '이미지를 꼭 업로드해야 하나요?',
        answer:
          '네, 이미지는 필수 항목입니다. 이 벽은 광고가 아닌 사람들의 이야기를 담는 공간이며, 업로드된 이미지는 구매자의 아이덴티티를 표현하는 중요한 요소로 사용됩니다.',
    },
      {
        question: '한 사용자가 여러 개의 픽셀을 구매할 수 있나요?',
        answer:
          '네, 가능합니다. 여러 번에 나누어 구매하거나, 한 번에 큰 영역을 선택해 한 번에 구매하실 수도 있어요.',
    },
    {
        question: '구매한 후 내용을 수정하거나 삭제할 수 있나요?',
        answer:
          '아직은 지원되지 않지만, 추후 업데이트를 통해 수정 기능을 제공할 수 있도록 준비 중이에요. 지금은 신중하게 입력해 주세요.',
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
