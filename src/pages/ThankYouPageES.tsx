import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Home } from 'lucide-react';

export default function ThankYouPageES() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-16717627054/4jnsCKrQ3dQbEK79yqM-',
      });
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hola! Solicité lotes + precios + plan de pago. ¿Me compartes disponibilidad y próximos pasos?"
  );

  return (
    <div className="min-h-screen bg-[#ECE5D8] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-olive/10 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-olive" />
          </div>

          <h1 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
            Solicitud recibida
          </h1>

          <p className="text-lg text-stone-600 mb-8">
            Un asesor de Selvadentro se pondrá en contacto contigo pronto con disponibilidad, precios y opciones de plan de pago.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={`https://wa.me/5219841374927?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar mensaje por WhatsApp
            </a>

            <a
              href="https://selvadentrotulum.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-dark-green/20 text-brand-dark-green rounded-full hover:bg-brand-dark-green/5 transition-all font-medium"
            >
              <Home className="w-5 h-5" />
              Volver a Selvadentro
            </a>
          </div>

          <div className="pt-8 border-t border-stone-200">
            <h2 className="font-cardo text-xl font-bold text-brand-dark-green mb-6">¿Qué sigue?</h2>
            <div className="space-y-4 text-left max-w-lg mx-auto">
              {[
                "Un asesor de Selvadentro revisará la disponibilidad según tus preferencias.",
                "Te contactaremos por WhatsApp, teléfono o correo con precios + opciones de plan de pago.",
                "Si lo deseas, agendamos una visita o videollamada.",
                "Si decides avanzar, te guiamos para reservar un lote.",
              ].map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-olive/10 text-brand-olive rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-stone-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500 mt-6">
              Sin spam — solo la información que solicitaste.
            </p>
          </div>
        </div>

        <p className="text-center text-stone-500 text-sm mt-8">
          ¿Preguntas? Escríbenos a{' '}
          <a href="mailto:Mkt@selvadentrotulum.com" className="text-brand-olive hover:underline">
            Mkt@selvadentrotulum.com
          </a>
        </p>
      </div>
    </div>
  );
}
