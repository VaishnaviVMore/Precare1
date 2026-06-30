// src/components/FAQ.jsx
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is PreCare?",
      answer:
        "PreCare is a cancer treatment guidance platform that helps patients find hospitals, understand treatment options, access educational resources, and receive personalized support."
    },
    {
      question: "How does PreCare help cancer patients?",
      answer:
        "PreCare provides hospital recommendations, treatment guidance, appointment assistance, educational content, and an AI chatbot to answer common cancer-related questions."
    },
    {
      question: "Is PreCare free to use?",
      answer:
        "Yes. PreCare is free to use and provides cancer awareness and treatment guidance at no cost."
    },
    {
      question: "Can I book hospital appointments through PreCare?",
      answer:
        "Yes. Patients can browse hospitals and request appointments through the platform."
    },
    {
      question: "Does PreCare replace a doctor's consultation?",
      answer:
        "No. PreCare is an informational platform and should not replace professional medical advice."
    },
    {
      question: "What is cancer?",
      answer:
        "Cancer is a disease in which abnormal cells grow uncontrollably and may spread to other parts of the body."
    },
    {
      question: "What are the main types of cancer treatment?",
      answer:
        "The main treatments include surgery, chemotherapy, radiation therapy, immunotherapy, and targeted therapy."
    },
    {
      question: "How important is early cancer detection?",
      answer:
        "Early detection significantly increases the chances of successful treatment and recovery."
    },
    {
      question: "Are treatment costs covered by insurance?",
      answer:
        "Many health insurance plans cover cancer treatment, but coverage depends on your policy."
    }
  ];

  return (
    <div className="bg-purple-50 p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Frequently Asked Questions
      </h2>

      {/* Scrollable FAQ List */}
      <div className="h-56 overflow-y-auto pr-2 custom-scrollbar">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-purple-200 py-3 last:border-b-0"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex justify-between items-center text-left font-semibold text-purple-700 hover:text-purple-900 transition-colors"
            >
              <span>{faq.question}</span>
              <span className="text-xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;