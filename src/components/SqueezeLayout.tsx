import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import VSL from './VSL';
import SqueezeForm from './SqueezeForm';
import Testimonials from './Testimonials';
import { SqueezeContent, SQUEEZE_VSL_MEDIA_ID } from '../config/squeezeContent';
import { captureTrackingParams } from '../utils/tracking';

interface SqueezeLayoutProps {
  content: SqueezeContent;
}

export default function SqueezeLayout({ content }: SqueezeLayoutProps) {
  // Capture UTM/gclid into localStorage on first paint so form submission sees them.
  useEffect(() => {
    captureTrackingParams();
    document.title = `${content.headline} | Selvadentro Tulum`;
  }, [content]);

  return (
    <div className="min-h-screen bg-[#ECE5D8] font-lexend">
      {/* MINIMAL HEADER — single logo, no nav (squeeze pages stay friction-free) */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://lotes.selvadentrotulum.com/" aria-label="Selvadentro">
            <img
              src="/logo-selvandentro_tulum.webp"
              alt="Selvadentro Tulum"
              className="h-9 sm:h-11 w-auto"
              width="180"
              height="44"
            />
          </a>
          <a
            href="tel:+529841374927"
            className="hidden sm:inline-block text-white/85 hover:text-white text-sm tracking-wide"
          >
            +52 984 137 4927
          </a>
        </div>
      </header>

      {/* HERO + VSL + FORM (above the fold on desktop) */}
      <section
        className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(35, 47, 38, 0.78), rgba(35, 47, 38, 0.88)), url('${content.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* LEFT — copy + VSL */}
            <div className="lg:col-span-3 text-white">
              <span className="inline-block text-brand-copper text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
                {content.eyebrow}
              </span>

              <h1 className="font-cardo font-bold leading-[1.05] text-white mb-5"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
                {content.headline}
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
                {content.subhead}
              </p>

              {/* VSL */}
              <div className="mb-8 max-w-2xl">
                <VSL mediaId={SQUEEZE_VSL_MEDIA_ID} language="es" />
              </div>

              {/* USP highlights */}
              <ul className="space-y-2.5 max-w-xl">
                {content.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — form (sticky on desktop, inline on mobile) */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <SqueezeForm angle={content.slug} ctaLabel={content.ctaLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — between hero and testimonials */}
      <section className="bg-brand-dark-green py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 text-center">
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">20+</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">años en bienes raíces</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">12</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">proyectos entregados</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">100%</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">escrituras</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — real buyer quotes (Ricardo Garza, Shawn) */}
      <Testimonials />

      {/* CLOSING CTA — secondary form trigger for users who scroll past the hero one */}
      <section className="py-16 px-4 sm:px-6 bg-brand-dark-green text-center">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="font-cardo text-3xl sm:text-4xl font-bold mb-3">
            ¿Listo para asegurar tu lote?
          </h2>
          <p className="text-white/80 mb-6">
            Solo quedan 8 lotes al precio de Fase 1. Cada 10 lotes vendidos, el precio sube 1%.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block px-8 py-4 bg-brand-copper text-white rounded-full font-semibold hover:bg-brand-beige hover:text-brand-dark-green transition-all shadow-xl"
          >
            {content.ctaLabel}
          </a>
        </div>
      </section>

      {/* FOOTER — minimal */}
      <footer className="bg-[#1F2A22] text-white/60 text-xs py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Selvadentro Tulum · Todos los derechos reservados</span>
          <span>
            <a href="tel:+529841374927" className="hover:text-white">+52 984 137 4927</a>
            <span className="mx-2">·</span>
            <a href="mailto:d.comercial@selvadentrotulum.com" className="hover:text-white">
              d.comercial@selvadentrotulum.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
