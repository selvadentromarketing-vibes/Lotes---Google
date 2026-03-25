import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is financing available?',
    answer: 'Yes, we offer flexible payment plan options with terms up to 48 months. No bank qualification needed—our in-house financing makes it simple to secure your lot with manageable monthly payments.',
  },
  {
    question: 'Where is it located?',
    answer: "Privada Suspiro is located in the Ruta de los Cenotes region near Tulum, a pristine jungle area known for its natural cenotes and untouched beauty. You're just minutes from Tulum's beaches and town center.",
  },
  {
    question: 'How do reservations work?',
    answer: "First, request the pricing and payment plan details. Our team will reach out to answer your questions and guide you through the lot selection process. When you're ready, a simple reservation agreement secures your chosen lot.",
  },
  {
    question: 'Can I visit?',
    answer: 'Absolutely. We encourage site visits to experience the property firsthand. Contact our team to schedule a private tour of Privada Suspiro and explore the jungle lots, cenotes, and masterplan amenities.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-2 border-stone-200 rounded-lg overflow-hidden transition-all"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
          >
            <span className="font-medium text-stone-800">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-stone-500 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-5 pt-0 text-stone-600 leading-relaxed">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
