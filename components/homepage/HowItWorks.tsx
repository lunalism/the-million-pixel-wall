// components/homepage/HowItWorks.tsx

"use client";

import { motion } from "framer-motion";
import { FaRegImage } from "react-icons/fa";
import { FiMousePointer } from "react-icons/fi";
import { RiPaypalLine } from "react-icons/ri";

// 💡 각 단계 카드 정보
const steps = [
  {
    icon: <FiMousePointer size={24} />,
    title: "Select Pixels",
    desc: "Click the grid and choose your spot. You own it forever.",
  },
  {
    icon: <FaRegImage size={24} />,
    title: "Upload Your Ad",
    desc: "Add your image and a link to your brand, project, or dream.",
  },
  {
    icon: <RiPaypalLine size={24} />,
    title: "Pay with PayPal",
    desc: "Complete the checkout and your pixels go live—instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4 md:px-12 bg-white text-center">
      {/* 🔠 제목 */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-10 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      {/* 📦 카드 그룹 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center border rounded-lg p-6 hover:shadow-md transition"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* 아이콘 */}
            <div className="text-outline mb-4">{step.icon}</div>

            {/* 타이틀 */}
            <h3 className="text-lg font-light mb-1">{step.title}</h3>

            {/* 설명 */}
            <p className="text-sm text-gray-500 leading-relaxed font-extralight">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
