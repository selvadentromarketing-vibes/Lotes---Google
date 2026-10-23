import { useEffect, type MouseEvent } from 'react';
import { CalendarDays, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import EventRegistrationForm from '../components/EventRegistrationForm';
import FAQ from '../components/FAQ';
import SqueezeFooter from '../components/SqueezeFooter';
import { captureTrackingParams } from '../utils/tracking';
import {
  OWNING_TULUM_EVENT as EVENT,
  OWNING_TULUM_LEARN,
  OWNING_TULUM_PROJECTS,
  OWNING_TULUM_AGENDA,
  OWNING_TULUM_FAQ,
  OWNING_TULUM_META,
} from '../config/owningTulumContent';

/**
 * In-person event landing: "Owning Tulum — An Investment Seminar", Toronto.
 * Same look as the squeeze landings (SqueezeLayout); copy lives in
 * owningTulumContent.ts, registrations go through eventWebhook.ts.
 */

const scrollToRegister = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
};

function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`inline-block text-brand-copper text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 ${className}`}>
      {children}
    </span>
  );
}

function EventDetails() {
  return (
    <ul className="space-y-2.5 text-sm sm:text-base text-stone-700">
      <li className="flex items-start gap-3">
        <CalendarDays className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" />
        <span>{EVENT.dateLabel}</span>
      </li>
      <li className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" />
        <span>{EVENT.timeLabel}</span>
      </li>
      <li className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-brand-copper shrink-0 mt-0.5" />
        <a
          href={EVENT.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-4 hover:underline hover:text-brand-dark-green"
        >
          {EVENT.venueName} · {EVENT.venueAddress}
        </a>
      </li>
    </ul>
  );
}

export default function OwningTulum() {
  useEffect(() => {
    captureTrackingParams();
    document.title = OWNING_TULUM_META.title;
  }, []);

  return (
    <div className="min-h-screen bg-[#ECE5D8] font-lexend">
      {/* MINIMAL HEADER */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://selvadentrotulum.com/" aria-label="Selvadentro">
            <img
              src="/logo-selvandentro_tulum-cream.webp"
              alt="Selvadentro Tulum"
              className="h-10 sm:h-12 w-auto"
            />
          </a>
          <a
            href="#register"
            onClick={scrollToRegister}
            className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-white/85 hover:text-white border border-white/40 hover:border-white rounded-full px-4 py-2 transition"
          >
            Reserve your seat
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(35, 47, 38, 0.78), rgba(35, 47, 38, 0.9)), url('${EVENT.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <Eyebrow>An evening in Toronto</Eyebrow>
          <h1 className="font-cardo font-bold leading-[1.02] text-white" style={{ fontSize: 'clamp(2.6rem, 7vw, 4.75rem)' }}>
            {EVENT.name}
          </h1>
          <p className="font-cardo text-2xl sm:text-3xl text-brand-beige mt-2 mb-6">{EVENT.subtitle}</p>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto mb-10">
            How buying in Tulum works for a foreign buyer, what it really costs, and the ways to invest — with three
            Tulum projects presenting side by side.
          </p>

          <div className="inline-flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/90 text-sm sm:text-base mb-10">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-brand-copper" />
              {EVENT.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-copper" />
              {EVENT.timeLabel}
            </span>
            <a
              href={EVENT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white underline-offset-4 hover:underline"
            >
              <MapPin className="w-5 h-5 text-brand-copper" />
              {EVENT.venueName}, {EVENT.venueStreet}
            </a>
          </div>

          <div>
            <a
              href="#register"
              onClick={scrollToRegister}
              className="inline-block px-9 py-4 bg-brand-copper text-white rounded-full font-semibold hover:bg-brand-beige hover:text-brand-dark-green transition-all shadow-xl"
            >
              Reserve your seat
            </a>
            <p className="mt-4 text-xs uppercase tracking-widest text-white/60">Free entry · Limited seating</p>
          </div>
        </div>
      </section>

      {/* 2. WHAT YOU'LL LEARN */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#ECE5D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>The evening</Eyebrow>
            <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight mb-4">
              What you'll learn
            </h2>
            <p className="text-stone-700 leading-relaxed">
              Two hours of clear answers for anyone thinking about owning in Tulum, whether to live, to rent out, or
              simply to hold.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {OWNING_TULUM_LEARN.map((item, i) => (
              <div key={item.title} className="bg-white/70 rounded-2xl border border-brand-dark-green/10 p-7">
                <span className="font-cardo text-3xl font-bold text-brand-copper">0{i + 1}</span>
                <h3 className="font-cardo text-xl sm:text-2xl font-bold text-brand-dark-green mt-3 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-stone-700 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE THREE PROJECTS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Presenting that night</Eyebrow>
            <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight">
              Three ways to own in Tulum
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {OWNING_TULUM_PROJECTS.map((project) => (
              <article
                key={project.name}
                className="flex flex-col rounded-2xl overflow-hidden border border-brand-dark-green/10 bg-[#F7F3EC] shadow-sm"
              >
                <div
                  className={`h-36 flex items-center justify-center px-8 ${
                    project.logoBg === 'dark' ? 'bg-[#232F26]' : 'bg-white'
                  }`}
                >
                  <img
                    src={project.logo.src}
                    alt={project.logo.alt}
                    className={`${project.logo.heightClass} w-auto max-w-full object-contain`}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  {/* Cards without a role keep the line on desktop so the three titles align. */}
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-widest text-brand-copper mb-1 ${
                      project.role ? 'block' : 'hidden md:block'
                    }`}
                  >
                    {project.role ?? ' '}
                  </span>
                  <h3 className="font-cardo text-2xl font-bold text-brand-dark-green mb-3">{project.name}</h3>
                  <p className="text-stone-700 leading-relaxed flex-1">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-olive hover:text-brand-dark-green transition"
                  >
                    {project.urlLabel}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AGENDA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-dark-green text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>{EVENT.dateLabel}</Eyebrow>
            <h2 className="font-cardo text-3xl sm:text-4xl font-bold leading-tight">The evening's agenda</h2>
          </div>
          <ol className="border-t border-white/15">
            {OWNING_TULUM_AGENDA.map((item) => (
              <li key={item.time} className="flex gap-6 sm:gap-10 py-5 border-b border-white/15">
                <span className="font-cardo text-xl sm:text-2xl font-bold text-brand-copper w-24 shrink-0">{item.time}</span>
                <div>
                  <p className="text-lg sm:text-xl text-white">{item.title}</p>
                  {item.detail && <p className="text-sm text-white/65 mt-1">{item.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. REGISTRATION */}
      <section id="register" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#ECE5D8] scroll-mt-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-3">
            <Eyebrow>Registration</Eyebrow>
            <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight mb-4">
              Join us at {EVENT.venueName}
            </h2>
            <p className="text-stone-700 leading-relaxed mb-8 max-w-xl">
              Entry is free. Seating is limited, so we ask everyone to register in advance — it takes less than a
              minute.
            </p>
            <EventDetails />
          </div>
          <div className="lg:col-span-2">
            <EventRegistrationForm />
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>Good to know</Eyebrow>
            <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight">
              Questions
            </h2>
          </div>
          <FAQ items={OWNING_TULUM_FAQ} />
          <p className="mt-8 text-center text-sm text-stone-600">
            Anything else? Write to{' '}
            <a href={`mailto:${EVENT.contactEmail}`} className="underline hover:text-brand-dark-green">
              {EVENT.contactEmail}
            </a>
          </p>
        </div>
      </section>

      {/* 7. FOOTER — same as the squeeze landings */}
      <SqueezeFooter lang="en" />
    </div>
  );
}
