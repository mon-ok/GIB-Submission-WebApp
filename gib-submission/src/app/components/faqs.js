import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is GIB HUB?",
      answer:
        "GIB HUB is a meme distribution platform where you can submit, explore, and download memes."
    },
    {
      question: "How do I submit a meme?",
      answer:
        "Click on the 'Submit to GIB' button, upload your file, and fill in the required details."
    },
    {
      question: "Is GIB HUB free to use?",
      answer:
        "Yes! All core features are completely free. We believe memes should be shared without barriers."
    },
    {
      question: "How does the trending section work?",
      answer:
        "Memes are sorted by likes. The more likes a meme has, the higher it appears in the trending section."
    }
  ];

   const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 text-white">
        <h2 className="text-3xl font-bold text-center mb-10 neon-glow">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto bg-black/70 rounded-2xl shadow-xl p-8 text-white">
        <div className="mono  max-w-3xl mx-auto divide-y divide-gray-700 border border-gray-700">
            {faqs.map((faq, index) => (
            <div
                key={index}
                className="cursor-pointer"
                onClick={() => toggleFAQ(index)}
            >
                {/* Question Row */}
                <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-900 transition">
                <span className="font-semibold uppercase tracking-wide">
                    {faq.question}
                </span>
                <span className="text-xl font-bold">
                    {openIndex === index ? "−" : "+"}
                </span>
                </div>

                {/* Answer Row */}
                <div
                className={`px-6 text-gray-300 transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
                >
                {faq.answer}
                </div>
            </div>
            ))}
        </div>
    </div>
    </section>
  );
}