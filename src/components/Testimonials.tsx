import { SQUEEZE_LAYOUT_T, type SqueezeLang } from '../config/squeezeContent';

/**
 * Real buyer testimonials for the squeeze landings.
 * Sourced from Selvadentro 2026-05.
 *
 * The cards are pre-designed images with quote + name baked in
 * (created by Selvadentro's design team). Files live in
 * `public/testimonials/`. Quote text + name in `QUOTES` below is
 * kept only as alt text for accessibility / SEO.
 *
 * Language note: Shawn's card is English, Ricardo's is Spanish.
 * Both are shown on both /es and /en pages — the mismatch reads
 * as "in the buyer's own words" rather than a bug. Swap to
 * matched-language versions once design provides them.
 */

interface TestimonialsProps {
  lang?: SqueezeLang;
}

type TestimonialRow = {
  src: string;
  alt: string;
  name: string;
};

const TESTIMONIALS: Record<SqueezeLang, TestimonialRow[]> = {
  es: [
    {
      src: '/testimonials/ricardo-garza.webp',
      alt: 'Ricardo Garza — "La seguridad que sentí en el proyecto y la experiencia de recorrer Selvadentro hicieron que tomara la decisión."',
      name: 'Ricardo Garza',
    },
    {
      src: '/testimonials/shawn.webp',
      alt: 'Shawn — "In a world moving too fast, Selvadentro Tulum feels like peace built into the jungle."',
      name: 'Shawn',
    },
  ],
  en: [
    {
      src: '/testimonials/shawn.webp',
      alt: 'Shawn — "In a world moving too fast, Selvadentro Tulum feels like peace built into the jungle."',
      name: 'Shawn',
    },
    {
      src: '/testimonials/ricardo-garza.webp',
      alt: 'Ricardo Garza — "The security I felt with the project and the experience of walking through Selvadentro made the decision for me."',
      name: 'Ricardo Garza',
    },
  ],
};

export default function Testimonials({ lang = 'es' }: TestimonialsProps) {
  const t = SQUEEZE_LAYOUT_T[lang];
  const rows = TESTIMONIALS[lang];

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#F8F5EF]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-brand-copper text-sm font-semibold tracking-widest uppercase">{t.testimonialsEyebrow}</span>
          <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mt-3">{t.testimonialsTitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {rows.map((row, i) => (
            <figure
              key={i}
              className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 bg-white"
            >
              <img
                src={row.src}
                alt={row.alt}
                loading="lazy"
                decoding="async"
                width={1024}
                height={1280}
                className="w-full h-auto block"
              />
              <figcaption className="sr-only">{row.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
