import { useState, useEffect } from 'react';
import { CheckCircle2, X, Shield, Lock, MapPin, Route, Droplet, Wifi, TreePine, Zap, Home, Wine, TreeDeciduous, Eye, Dumbbell, Table, Waves, Heart, Baby, PawPrint, Trees, Map, ChevronDown, Flame } from 'lucide-react';
import MultiStepFormES from '../components/MultiStepFormES';
import TrebolaHeader from '../components/TrebolaHeader';
import VSL from '../components/VSL';
import { STARTING_PRICE_MXN, formatPrice, PRICING_FOOTNOTE } from '../config/pricing';
import { translations } from '../config/translations';

export default function LandingPage2ES() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const t = translations.es;

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ECE5D8]">
      <TrebolaHeader onOpenForm={() => setIsFormOpen(true)} translations={t} />

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-stone-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <MultiStepFormES />
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src="/hero-selvandentro_tulum.webp"
            alt="Selvadentro - tierra de cenotes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/60 to-stone-900/75"></div>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <span className="text-brand-copper text-sm sm:text-base font-semibold tracking-widest uppercase">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="font-cardo text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 max-w-5xl">
              {t.hero.headline}
            </h1>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2 max-w-5xl">
              <span className="text-brand-copper">{formatPrice(STARTING_PRICE_MXN, 'MXN')}*</span>
            </p>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-5xl">
              {t.hero.headlinePrice}
            </p>

            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed mb-10 max-w-3xl font-light">
              {t.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 sm:px-10 sm:py-5 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-base sm:text-lg shadow-2xl hover:shadow-brand-dark-green/50 hover:scale-105"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollToSection('masterplan')}
                className="px-6 py-3 sm:px-10 sm:py-5 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all font-semibold text-base sm:text-lg backdrop-blur-sm"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>

            <p className="text-sm text-white/60 mb-4">
              {PRICING_FOOTNOTE.es}
            </p>

            <div className="mt-20">
              <button
                onClick={() => scrollToSection('masterplan')}
                className="text-white/60 hover:text-white transition-colors animate-bounce"
              >
                <ChevronDown className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="text-brand-olive text-sm font-semibold tracking-widest uppercase">
                Video
              </span>
            </div>
            <h2 className="font-cardo text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green mb-10 leading-tight">
              Descubre Privada Suspiro
            </h2>
            <VSL />
          </div>
        </div>
      </div>

      {/* MASTER PLAN SECTION */}
      <div id="masterplan" className="relative bg-[#ECE5D8] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="mb-4">
                <span className="text-brand-olive text-sm font-semibold tracking-widest uppercase">
                  {t.masterplan.eyebrow}
                </span>
              </div>
              <h2 className="font-cardo text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green mb-6 leading-tight">
                {t.masterplan.title}
              </h2>
              <p className="text-lg sm:text-xl text-brand-dark-green/80 leading-relaxed mb-8">
                {t.masterplan.description}
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-olive mt-1 flex-shrink-0" />
                  <span className="text-lg text-brand-dark-green">{t.masterplan.bullet1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-olive mt-1 flex-shrink-0" />
                  <span className="text-lg text-brand-dark-green">{t.masterplan.bullet2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-olive mt-1 flex-shrink-0" />
                  <span className="text-lg text-brand-dark-green">{t.masterplan.bullet3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-olive mt-1 flex-shrink-0" />
                  <span className="text-lg text-brand-dark-green">{t.masterplan.bullet4}</span>
                </li>
              </ul>
              <div className="text-center lg:text-left">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  {t.masterplan.cta}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/9-selvadentro_tulum.webp"
                  alt="Plan maestro"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE SECTION */}
      <div id="advantages" className="relative bg-white py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-cardo text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-dark-green mb-20 text-center">
            {t.comparison.title}
          </h2>

          <div className="mb-16">
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-stone-300">
                    <th className="pb-6 text-left w-1/2"></th>
                    <th className="pb-6 text-center w-1/4">
                      <span className="text-xl font-bold text-brand-dark-green">{t.comparison.columnA}</span>
                    </th>
                    <th className="pb-6 text-center w-1/4">
                      <span className="text-xl font-bold text-brand-dark-green">{t.comparison.columnB}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {[
                    t.comparison.row1,
                    t.comparison.row2,
                    t.comparison.row3,
                    t.comparison.row4,
                    t.comparison.row5,
                    t.comparison.row6,
                    t.comparison.row7,
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-6 pr-8 text-left">
                        <span className="text-base sm:text-lg text-brand-dark-green">{row}</span>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex justify-center">
                          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-brand-olive" strokeWidth={2.5} />
                        </div>
                      </td>
                      <td className="py-6 text-center">
                        <div className="flex justify-center">
                          <X className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" strokeWidth={2.5} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {[
                t.comparison.row1,
                t.comparison.row2,
                t.comparison.row3,
                t.comparison.row4,
                t.comparison.row5,
                t.comparison.row6,
                t.comparison.row7,
              ].map((row, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="text-base font-medium text-brand-dark-green mb-4">{row}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-brand-olive" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-brand-olive">{t.comparison.columnA}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-stone-500">{t.comparison.columnB}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INFRASTRUCTURE ICONS */}
          <div className="mt-16 mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
              {[
                { icon: Shield, label: t.infrastructure.security },
                { icon: Lock, label: t.infrastructure.access },
                { icon: MapPin, label: t.infrastructure.entrance },
                { icon: Route, label: t.infrastructure.roads },
                { icon: Droplet, label: t.infrastructure.water },
                { icon: Wifi, label: t.infrastructure.internet },
                { icon: TreePine, label: t.infrastructure.landscaping },
                { icon: Zap, label: t.infrastructure.energy },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-2 md:gap-3 p-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-brand-olive">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-medium text-brand-dark-green/80 leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t.comparison.cta}
            </button>
          </div>
        </div>
      </div>

      {/* AMENITIES SECTION */}
      <div id="amenities" className="relative bg-[#ECE5D8] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-brand-olive text-sm font-semibold tracking-widest uppercase">
                {t.amenities.eyebrow}
              </span>
            </div>
            <h2 className="font-cardo text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green mb-6 leading-tight max-w-5xl mx-auto">
              {t.amenities.title}
            </h2>
          </div>

          <div className="mb-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-4 md:mb-8">
              {[
                { icon: Baby, label: t.amenities.items.kids },
                { icon: PawPrint, label: t.amenities.items.pet },
                { icon: Map, label: t.amenities.items.trails },
                { icon: Heart, label: t.amenities.items.wellness },
                { icon: Eye, label: t.amenities.items.avenue },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-olive flex-shrink-0">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm sm:text-base font-normal text-brand-dark-green leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
              {[
                { icon: Flame, label: t.amenities.items.firepit },
                { icon: Dumbbell, label: t.amenities.items.gym },
                { icon: TreeDeciduous, label: t.amenities.items.treehouse },
                { icon: Table, label: t.amenities.items.padel },
                { icon: Home, label: t.amenities.items.clubhouse },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 flex items-center justify-center text-brand-olive flex-shrink-0">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm sm:text-base font-normal text-brand-dark-green leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/2-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/4-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/5-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/7-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/8-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/01-selvandentro_tulum.webp"
                alt="Amenidad"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t.amenities.cta}
            </button>
          </div>
        </div>
      </div>

      {/* ONE STEP AWAY SECTION */}
      <div className="relative bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-cardo text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green mb-6 leading-tight">
              {t.oneStepAway.title}
            </h2>
            <p className="text-xl sm:text-2xl text-brand-dark-green/80 leading-relaxed font-light">
              {t.oneStepAway.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: t.oneStepAway.block1Title,
                text: t.oneStepAway.block1Text,
              },
              {
                title: t.oneStepAway.block2Title,
                text: t.oneStepAway.block2Text,
              },
              {
                title: t.oneStepAway.block3Title,
                text: t.oneStepAway.block3Text,
              },
            ].map((block, index) => (
              <div key={index} className="bg-[#ECE5D8] rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="font-cardo text-xl font-bold text-brand-dark-green mb-4">
                  {block.title}
                </h3>
                <p className="text-brand-dark-green/80 leading-relaxed mb-6">
                  {block.text}
                </p>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="text-brand-olive font-semibold hover:text-brand-dark-green transition-colors inline-flex items-center gap-2"
                >
                  {t.oneStepAway.cta}
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-10 py-5 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t.oneStepAway.cta}
            </button>
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="relative bg-[#ECE5D8] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex justify-center items-center py-8">
              <img
                src="/development_company_logo-jjf_creando.webp"
                alt="JJF Creando"
                className="h-16 md:h-24 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center items-center py-8">
              <img
                src="/logo-v.png"
                alt="Estudio AMA"
                className="h-16 md:h-24 w-auto object-contain"
              />
            </div>
            <div className="flex justify-center items-center py-8">
              <img
                src="/maat.png"
                alt="maat handasa"
                className="h-16 md:h-24 w-auto object-contain"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: t.trust.card1Title,
                text: t.trust.card1Text,
              },
              {
                title: t.trust.card2Title,
                text: t.trust.card2Text,
              },
              {
                title: t.trust.card3Title,
                text: t.trust.card3Text,
              },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <h3 className="font-cardo text-xl font-bold text-brand-dark-green mb-4">
                  {card.title}
                </h3>
                <p className="text-brand-dark-green/80 leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t.trust.cta}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative bg-brand-dark-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex-shrink-0">
              <img
                src="/selvadentro__20.png"
                alt="Selvadentro"
                className="h-16 w-auto opacity-80"
              />
            </div>

            <nav className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() => scrollToSection('masterplan')}
                className="text-sm font-medium text-stone-400 hover:text-white transition-colors"
              >
                {t.header.masterplan}
              </button>
              <button
                onClick={() => scrollToSection('advantages')}
                className="text-sm font-medium text-stone-400 hover:text-white transition-colors"
              >
                {t.header.advantages}
              </button>
              <button
                onClick={() => scrollToSection('amenities')}
                className="text-sm font-medium text-stone-400 hover:text-white transition-colors"
              >
                {t.header.amenities}
              </button>
            </nav>

            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-2.5 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-medium text-sm"
            >
              {t.header.ctaButton}
            </button>
          </div>

          <div className="border-t border-stone-800 pt-8">
            <p className="text-xs text-stone-500 text-center leading-relaxed max-w-4xl mx-auto mb-6">
              {t.footer.disclaimer}
            </p>
            <p className="text-xs text-stone-400 text-center">
              Todos los derechos reservados | {' '}
              <a
                href="https://selvadentrotulum.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                Política de Privacidad
              </a>
              {' '} | {' '}
              <a
                href="https://selvadentrotulum.com/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                Términos y Condiciones
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
