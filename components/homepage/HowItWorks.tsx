// components/homepage/HowItWorks.tsx

import { FaMousePointer, FaImage, FaPaypal } from "react-icons/fa";

const steps = [
  {
    icon: <FaMousePointer size={24} />,
    title: "Select Pixels",
    desc: "Click the grid and choose your spot. You own it forever.",
  },
  {
    icon: <FaImage size={24} />,
    title: "Upload Your Ad",
    desc: "Add your image and a link to your brand, project, or dream.",
  },
  {
    icon: <FaPaypal size={24} />,
    title: "Pay with PayPal",
    desc: "Complete the checkout and your pixels go live—instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 px-4 md:px-12 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center border rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="text-blue-600 mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
