import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, ArrowUpRight, CheckCircle2, CalendarPlus, Download, Play, X } from 'lucide-react';
import EventRegistrationForm from '../components/EventRegistrationForm';
import FAQ from '../components/FAQ';
import SqueezeFooter from '../components/SqueezeFooter';
import { captureTrackingParams } from '../utils/tracking';
import { googleCalendarUrl } from '../utils/eventCalendar';
import {
  OWNING_TULUM_EVENT as EVENT,
  OWNING_TULUM_LEARN,
  OWNING_TULUM_PROJECTS,
  OWNING_TULUM_AGENDA,
  OWNING_TULUM_FAQ,
  OWNING_TULUM_META,
  OWNING_TULUM_CALENDAR,
  type EventProject,
} from '../config/owningTulumContent';

/**
 * In-person event landing: "Owning Tulum — An Investment Seminar", Toronto.
 * Same look as the squeeze landings (SqueezeLayout); copy lives in
 * owningTulumContent.ts, registrations go through eventWebhook.ts.
 *
 * With ?registered=1 (a link for people who already signed up) the form is
 * replaced by their event details and "Add to calendar". No form means no Meta
 * Lead and no conversion. Without the parameter the page is unchanged.
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

function EventDetails({ showVenue = false }: { showVenue?: boolean }) {
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
        {showVenue ? (
          <a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline hover:text-brand-dark-green"
          >
            {EVENT.venueName} · {EVENT.venueAddress}
          </a>
        ) : (
          <span>{EVENT.venuePending}</span>
        )}
      </li>
    </ul>
  );
}

function RegisteredDetails() {
  const button =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition';
  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
      <div className="lg:col-span-3">
        <Eyebrow>Your registration</Eyebrow>
        <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight mb-4">
          You’re registered — see you in Toronto
        </h2>
        <p className="text-stone-700 leading-relaxed mb-4 max-w-xl">
          We’ll contact you before the event to confirm your attendance.
        </p>
        <p className="text-sm text-stone-600">
          Questions? Write to{' '}
          <a href={`mailto:${EVENT.contactEmail}`} className="underline hover:text-brand-dark-green">
            {EVENT.contactEmail}
          </a>
        </p>
      </div>
      <div className="lg:col-span-2">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
          <CheckCircle2 className="w-10 h-10 text-brand-olive mb-4" />
          <h3 className="font-cardo text-2xl sm:text-3xl font-bold text-brand-dark-green leading-tight">{EVENT.name}</h3>
          <p className="font-cardo text-lg text-brand-copper mb-5">{EVENT.subtitle}</p>
          <EventDetails showVenue />
          <a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button} mt-6 w-full bg-brand-olive text-white hover:bg-brand-dark-green shadow-lg`}
          >
            <MapPin className="w-4 h-4" />
            Open in Google Maps
          </a>
          <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-stone-700">Add to calendar</p>
          <div className="grid gap-3">
            <a
              href={googleCalendarUrl(OWNING_TULUM_CALENDAR)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button} border border-stone-300 text-brand-dark-green hover:border-brand-olive`}
            >
              <CalendarPlus className="w-4 h-4" />
              Google Calendar
            </a>
            <a
              href={OWNING_TULUM_CALENDAR.icsPath}
              className={`${button} border border-stone-300 text-brand-dark-green hover:border-brand-olive`}
            >
              <Download className="w-4 h-4" />
              Apple / Outlook (.ics)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }: { project: EventProject; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} video`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3 text-white">
          <p className="font-cardo text-xl font-bold">{project.name}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            autoFocus
            className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-white/40 hover:border-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&playsinline=1`}
            title={`${project.name} video`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

export default function OwningTulum() {
  const [searchParams] = useSearchParams();
  const registered = searchParams.get('registered') === '1';
  const ctaLabel = registered ? 'Event details' : 'Reserve your seat';
  const [videoProject, setVideoProject] = useState<EventProject | null>(null);
  const closeVideo = useCallback(() => setVideoProject(null), []);

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
            {ctaLabel}
          </a>
        </div>
      </header>

      {/* 1. HERO */}
      <section
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(35, 47, 38, 0.6), rgba(35, 47, 38, 0.82)), url('${EVENT.heroImage}')`,
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
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-copper" />
              {EVENT.venuePending}
            </span>
          </div>

          <div>
            <a
              href="#register"
              onClick={scrollToRegister}
              className="inline-block px-9 py-4 bg-brand-copper text-white rounded-full font-semibold hover:bg-brand-beige hover:text-brand-dark-green transition-all shadow-xl"
            >
              {ctaLabel}
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
                <button
                  type="button"
                  onClick={() => project.videoId && setVideoProject(project)}
                  disabled={!project.videoId}
                  aria-label={project.videoId ? `Watch the ${project.name} video` : undefined}
                  className={`group relative h-36 flex items-center justify-center px-8 enabled:cursor-pointer ${
                    project.logoBg === 'dark' ? 'bg-[#232F26]' : 'bg-white'
                  }`}
                >
                  <img
                    src={project.logo.src}
                    alt={project.logo.alt}
                    className={`${project.logo.heightClass} w-auto max-w-full object-contain transition group-hover:opacity-80`}
                    loading="lazy"
                  />
                  {project.videoId && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 group-hover:bg-brand-copper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white transition">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Video
                    </span>
                  )}
                </button>
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
                  {project.videoId && (
                    <button
                      type="button"
                      onClick={() => setVideoProject(project)}
                      className="mt-6 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-olive text-white text-sm font-semibold hover:bg-brand-dark-green transition"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Watch video
                    </button>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${project.videoId ? 'mt-4' : 'mt-6'} inline-flex items-center gap-1.5 text-sm font-semibold text-brand-olive hover:text-brand-dark-green transition`}
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

      {/* 5. REGISTRATION — with ?registered=1, the attendee's details instead of the form */}
      <section id="register" className="py-16 sm:py-20 px-4 sm:px-6 bg-[#ECE5D8] scroll-mt-4">
        {registered ? (
          <RegisteredDetails />
        ) : (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-3 lg:sticky lg:top-12 lg:pt-8">
              <Eyebrow>Registration</Eyebrow>
              <h2 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight mb-4">
                Join us in Toronto
              </h2>
              <p className="text-stone-700 leading-relaxed mb-8 max-w-xl">
                Entry is free. Seating is limited, so we ask everyone to register in advance — it only takes a
                couple of minutes. Registered guests receive their invitation with the exact location.
              </p>
              <EventDetails />
            </div>
            <div className="lg:col-span-2">
              <EventRegistrationForm />
            </div>
          </div>
        )}
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

      {videoProject && <VideoModal project={videoProject} onClose={closeVideo} />}
    </div>
  );
}
