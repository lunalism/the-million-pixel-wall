export function HeroSection() {
    return (
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The Million Pixel Wall
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Leave your brand in digital history.
        </p>
        <a
          href="/purchase"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Buy Pixels
        </a>
      </section>
    );
  }
  