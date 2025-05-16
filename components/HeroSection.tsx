'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-white text-black px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          THE MILLION PIXEL WALL
        </h1>
        <p className="mt-4 text-base md:text-xl text-black/70">
          Leave your brand in digital history.
        </p>
        <button className="mt-8 px-6 py-3 bg-black text-white rounded-2xl hover:bg-black/80 transition">
          BUY PIXELS
        </button>
      </div>
    </section>
  );
}
