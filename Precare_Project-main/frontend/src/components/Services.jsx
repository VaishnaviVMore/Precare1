import React from "react";
import { Wallet, Hospital, FileText, Stethoscope, Heart } from "lucide-react";

const services = [
  { icon: <Wallet className="w-10 h-10 text-blue-600" />, title: "Predict Costs", text: "Estimate cancer treatment expenses with AI." },
  { icon: <Hospital className="w-10 h-10 text-blue-600" />, title: "Find Hospitals", text: "Get recommended hospitals with map view." },
  { icon: <FileText className="w-10 h-10 text-blue-600" />, title: "Treatment Guide", text: "Step-by-step guidance with videos." },
  { icon: <Stethoscope className="w-10 h-10 text-blue-600" />, title: "Book Appointment", text: "Consult top doctors directly online." },
  { icon: <Heart className="w-10 h-10 text-blue-600" />, title: "Insurance Help", text: "Explore schemes & financial support." },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
            <div className="flex justify-center mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
