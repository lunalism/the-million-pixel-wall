const steps = [
    { title: "1. Select Pixels", desc: "Choose available tiles on the grid." },
    { title: "2. Upload Image", desc: "Provide your image and a URL." },
    { title: "3. Pay with PayPal", desc: "Secure your pixels and go live." },
  ];
  
  export function HowItWorks() {
    return (
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="border p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  