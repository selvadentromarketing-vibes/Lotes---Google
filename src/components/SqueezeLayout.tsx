import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import VSL from './VSL';
import SqueezeForm from './SqueezeForm';
import Testimonials from './Testimonials';
import {
  SQUEEZE_CONTENT,
  SQUEEZE_VSL_MEDIA_ID,
  SQUEEZE_LAYOUT_T,
  type SqueezeLang,
} from '../config/squeezeContent';
import type { SqueezeAngle } from '../utils/squeezeWebhook';
import { captureTrackingParams } from '../utils/tracking';

interface SqueezeLayoutProps {
  angle: SqueezeAngle;
  lang?: SqueezeLang;
}

export default function SqueezeLayout({ angle, lang = 'es' }: SqueezeLayoutProps) {
  const content = SQUEEZE_CONTENT[angle][lang];
  const t = SQUEEZE_LAYOUT_T[lang];
  const otherLang: SqueezeLang = lang === 'es' ? 'en' : 'es';
  const swapPath = lang === 'es' ? `/en/${angle}` : `/${angle}`;
  const copyrightSuffix = lang === 'en' ? 'All rights reserved' : 'Todos los derechos reservados';

  useEffect(() => {
    captureTrackingParams();
    document.title = `${content.headline} | Selvadentro Tulum`;
  }, [content]);

  return (
    <div className="min-h-screen bg-[#ECE5D8] font-lexend">
      {/* MINIMAL HEADER */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://lotes.selvadentrotulum.com/" aria-label="Selvadentro">
            <img
              src="/logo-selvandentro_tulum-cream.webp"
              alt="Selvadentro Tulum"
              className="h-10 sm:h-12 w-auto"
            />
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={swapPath}
              className="text-[11px] font-semibold tracking-widest text-white/75 hover:text-white px-2 transition"
              title={`Switch to ${otherLang.toUpperCase()}`}
            >
              {lang.toUpperCase()} · <span className="text-brand-copper underline">{otherLang.toUpperCase()}</span>
            </a>
            <a
              href="tel:+529994890828"
              className="hidden sm:inline-block text-white/85 hover:text-white text-sm tracking-wide"
            >
              +52 999 489 0828
            </a>
          </div>
        </div>
      </header>

      {/* HERO + VSL + FORM */}
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

              <div className="mb-8 max-w-2xl">
                <VSL mediaId={SQUEEZE_VSL_MEDIA_ID} language={lang} />
              </div>

              <ul className="space-y-2.5 max-w-xl">
                {content.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <SqueezeForm angle={content.slug} ctaLabel={content.ctaLabel} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-brand-dark-green py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3 text-center">
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">20+</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">{t.trustYears}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">12</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">{t.trustProjects}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/20" />
          <div className="text-white/85">
            <span className="font-cardo text-2xl font-bold text-brand-copper">100%</span>
            <span className="ml-2 text-xs sm:text-sm uppercase tracking-wider">{t.trustDeeded}</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials lang={lang} />

      {/* DEVELOPER TRACK RECORD */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-[#ECE5D8]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-brand-copper text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            {t.devBlockEyebrow}
          </span>
          <h2 className="font-cardo text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark-green leading-tight mb-4">
            {t.devBlockTitle}
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src="/development_company_logo-jjf_creando.webp"
              alt="JJF Creando"
              className="h-16 sm:h-20 w-auto"
              loading="lazy"
            />
          </div>
          <p className="text-stone-700 leading-relaxed max-w-2xl mx-auto mb-7 text-base sm:text-lg">
            {t.devBlockBody}
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 py-4 bg-white/70 rounded-2xl border border-brand-dark-green/10">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-dark-green/70">
              {t.devBlockProjectsLabel}
            </span>
            <div className="flex items-center gap-5 sm:gap-7">
              <span className="font-cardo text-base sm:text-lg font-bold text-brand-dark-green">
                Aldea Zama
                <span className="block text-[11px] font-lexend font-normal uppercase tracking-wider text-stone-500">Tulum</span>
              </span>
              <span className="w-px h-8 bg-brand-dark-green/20" />
              <span className="font-cardo text-base sm:text-lg font-bold text-brand-dark-green">
                Yucatán Country Club
                <span className="block text-[11px] font-lexend font-normal uppercase tracking-wider text-stone-500">Mérida</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-16 px-4 sm:px-6 bg-brand-dark-green text-center">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="font-cardo text-3xl sm:text-4xl font-bold mb-3">{t.closingTitle}</h2>
          <p className="text-white/80 mb-6">{t.closingBody}</p>
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

      {/* FOOTER */}
      <footer className="bg-[#1F2A22] text-white/60 text-xs py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Selvadentro Tulum · {copyrightSuffix} ·{' '}
            <a href="https://tothemaxmedia.com" target="_blank" rel="noopener" className="hover:text-white">
              Built by To The Max Media
            </a>
          </span>
          <span>
            <a href="tel:+529994890828" className="hover:text-white">+52 999 489 0828</a>
            <span className="mx-2">·</span>
            <a href="mailto:info@selvadentrotulum.com" className="hover:text-white">
              info@selvadentrotulum.com
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
