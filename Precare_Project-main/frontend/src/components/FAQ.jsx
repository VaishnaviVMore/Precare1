// src/components/FAQ.jsx
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is the first step in cancer treatment?",
      answer: "Diagnosis and staging are the first steps to decide the treatment plan."
    },
    {
      question: "Are treatment costs covered by insurance?",
      answer: "Most insurance plans cover major cancer treatments, but coverage may vary."
    },
    {
      question: "Can I book hospital appointments online?",
      answer: "Yes, most top hospitals offer online appointment booking options."
    }
  ];

  return (
    <div className="bg-purple-50 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b py-3">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center text-left font-semibold text-purple-700"
          >
            {faq.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
