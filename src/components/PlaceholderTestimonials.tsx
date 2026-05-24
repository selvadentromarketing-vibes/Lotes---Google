import { Star } from 'lucide-react';

/**
 * PLACEHOLDER TESTIMONIALS — replace with real Selvadentro / Aldea Zama buyer quotes
 * before scaling ad spend. Names, cities, and photos are fictional.
 *
 * Per PDF 1 §1.2 (Nivel 1): text + name + city + photo is the minimum to ship.
 * Nivel 2 upgrade: 30-60s video testimonials. Nivel 3: actual escritura screenshots.
 */
export default function PlaceholderTestimonials() {
  const testimonials = [
    {
      // PLACEHOLDER: replace with real buyer
      quote:
        'Lo que me convenció fue ver el track record del desarrollador. Compré en Fase 1 y ya subió el precio. Mi terreno está al lado del cenote principal.',
      name: 'Eduardo M.',
      city: 'CDMX, México',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
    {
      // PLACEHOLDER: replace with real buyer
      quote:
        'Comparé contra Aldea Zama y dos proyectos más. Selvadentro fue el único con financiamiento real a 48 meses sin intereses. Cerré en una semana.',
      name: 'Sofía R.',
      city: 'Monterrey, México',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    },
    {
      // PLACEHOLDER: replace with real buyer
      quote:
        'I bought from the US through the fideicomiso. Process was clean, escritura arrived on time. Already planning my second lot.',
      name: 'Michael K.',
      city: 'Austin, TX',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#F8F5EF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-copper text-sm font-semibold tracking-widest uppercase">
            Inversionistas Selvadentro
          </span>
          <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mt-3">
            Otros ya tomaron la decisión
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100"
            >
              <div className="flex gap-0.5 mb-3 text-brand-copper">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-stone-700 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-brand-dark-green text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-stone-500">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-stone-400">
          {/* Remove this disclaimer once real testimonials replace placeholders */}
          Testimonios ilustrativos. Compradores reales disponibles bajo solicitud.
        </p>
      </div>
    </section>
  );
}
