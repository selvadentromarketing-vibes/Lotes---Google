/**
 * Real buyer testimonials for the squeeze landings.
 * Sourced from Selvadentro 2026-05 — names + quotes only, no photos by request.
 */
export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'La seguridad que sentí en el proyecto y la experiencia de recorrer Selvadentro hicieron que tomara la decisión.',
      name: 'Ricardo Garza',
    },
    {
      quote:
        'En un mundo que avanza demasiado rápido, Selvadentro Tulum se siente como paz construida en la selva.',
      name: 'Shawn',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#F8F5EF]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-copper text-sm font-semibold tracking-widest uppercase">
            Inversionistas Selvadentro
          </span>
          <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mt-3">
            Otros ya tomaron la decisión
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-stone-100"
            >
              <span
                className="font-cardo text-6xl text-brand-copper/30 leading-none absolute top-4 left-6 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-cardo text-lg sm:text-xl leading-relaxed text-brand-dark-green/90 italic pt-6">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-brand-copper" />
                <span className="text-xs tracking-[0.2em] uppercase text-brand-dark-green font-semibold">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
