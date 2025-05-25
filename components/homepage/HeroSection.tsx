"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="text-center py-16">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Million Pixel Wall
      </motion.h1>

      <motion.p
        className="text-gray-600 text-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        Leave your brand, art, or memory in digital history — one pixel at a time. <br />
        This is your space to be remembered, discovered, and displayed for years to come.
      </motion.p>
    </section>
  );
}
