import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Hay financiamiento disponible?',
    answer: 'Sí, ofrecemos opciones de plan de pago flexibles con plazos de hasta 48 meses. Sin necesidad de calificación bancaria—nuestro financiamiento interno hace que sea simple asegurar tu lote con pagos mensuales manejables.',
  },
  {
    question: '¿Dónde está ubicado?',
    answer: 'Privada Suspiro está ubicada en la región de la Ruta de los Cenotes cerca de Tulum, un área de selva prístina conocida por sus cenotes naturales y belleza intacta. Estás a solo minutos de las playas y el centro de Tulum.',
  },
  {
    question: '¿Cómo funcionan las reservas?',
    answer: 'Primero, solicita los detalles de precios y plan de pago. Nuestro equipo se comunicará para responder tus preguntas y guiarte a través del proceso de selección de lote. Cuando estés listo, un simple acuerdo de reserva asegura tu lote elegido.',
  },
  {
    question: '¿Puedo visitarlo?',
    answer: 'Absolutamente. Alentamos las visitas al sitio para experimentar la propiedad de primera mano. Contacta a nuestro equipo para programar un recorrido privado de Privada Suspiro y explorar los lotes de selva, cenotes y amenidades del masterplan.',
  },
];

export default function FAQES() {
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
