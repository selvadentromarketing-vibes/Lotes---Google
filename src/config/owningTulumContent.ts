/**
 * Copy and settings for the in-person event landings "Owning Tulum — An
 * Investment Seminar". English only. One config per city; the page
 * (OwningTulum.tsx), the form, the GHL webhook, the share HTML and the .ics
 * file all read everything city-specific from it.
 *
 *   Toronto  · Nov 19 2026 → /owning-tulum
 *   Montreal · Nov 25 2026 → /owning-tulum-montreal
 *
 * Everything the team is expected to edit (partner logos, videos, agenda, FAQ)
 * lives here, so the page component never needs touching for copy changes.
 *
 * Paths: a city gets its own top-level path (/owning-tulum-<city>), never a
 * sub-path like /owning-tulum/<city> — that would need a folder named like
 * owning-tulum.html and could stop Netlify serving Toronto's share preview.
 */
import type { CalendarEvent } from '../utils/eventCalendar';

export interface EventProject {
  name: string;
  /** Small label above the name, e.g. "Host". */
  role?: string;
  description: string;
  url: string;
  urlLabel: string;
  logo: {
    src: string;
    alt: string;
    /** Tailwind height class — tune per logo so they read at the same weight. */
    heightClass: string;
  };
  /** Background behind the logo: 'dark' for light logos, 'light' for dark ones. */
  logoBg: 'dark' | 'light';
  /** YouTube video ID — clicking the card plays it in a modal. Leave it out to hide the video buttons. */
  videoId?: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  detail?: string;
}

export interface EventFaqItem {
  question: string;
  answer: string;
  /** With ?registered=1 the answer is replaced by the venue and its address. */
  revealsVenue?: boolean;
}

export interface OwningTulumEventConfig {
  /** Route of the landing, e.g. '/owning-tulum'. */
  path: string;
  /** Share HTML the build writes for the route (vite.config.ts): the path without its leading slash, plus .html. */
  htmlFile: string;
  event: {
    name: string;
    subtitle: string;
    city: string;
    dateLabel: string;
    timeLabel: string;
    venueName: string;
    venueStreet: string;
    venueAddress: string;
    mapUrl: string;
    contactEmail: string;
    /** Shown on the public page instead of the venue, which is only revealed after registering. */
    venuePending: string;
    heroImage: string;
  };
  /** Title, description and share image. The page also uses the title for the tab. */
  meta: {
    url: string;
    title: string;
    description: string;
    /** 1200×630. Absolute URL: several crawlers ignore relative image paths. */
    image: string;
  };
  /** "Add to calendar" with ?registered=1. Times are UTC. */
  calendar: CalendarEvent & { icsPath: string };
  form: {
    /** Must match the Meta lead form of the city's ad word for word. */
    attendanceQuestion: string;
  };
  /** Registrations go to the city's own GHL workflow. */
  webhook: {
    url: string;
    tag: string;
    eventId: string;
    /** Sent as utm_campaign when the visitor arrives without one — the exact Meta campaign name. */
    defaultCampaign: string;
  };
  /** content_name of the Meta Lead fired on a successful registration. */
  leadContentName: string;
  learn: { title: string; body: string }[];
  projects: EventProject[];
  agenda: EventAgendaItem[];
  faq: EventFaqItem[];
}

// ---------------------------------------------------------------------------
// Shared by every city
// ---------------------------------------------------------------------------

const LEARN = [
  {
    title: 'How a foreigner buys in Tulum',
    body:
      "Tulum sits in Mexico's restricted coastal zone, so foreign buyers hold title through a fideicomiso — a bank trust. What it is, how it is set up, and how ownership is held and passed on.",
  },
  {
    title: 'The real costs',
    body:
      'What it takes beyond the price: closing and notary fees, setting up and keeping the trust, property tax and maintenance — so you budget for the whole picture, not just the list price.',
  },
  {
    title: 'Different ways to invest',
    body:
      'Land you build on, a finished residence, or ownership by the week. How each model earns, what each one asks of you, and who it suits.',
  },
];

/** The three projects, with partner logos under `assetDir` (Selvadentro's logo is site-wide). */
const projects = (
  assetDir: string,
  videos: { selvadentro?: string; adhonai?: string; trobbu?: string },
): EventProject[] => [
  {
    name: 'Selvadentro',
    role: 'Host',
    description:
      "Cenote-centered residential lots in Tulum's jungle — a low-density master plan with 9 cenotes.",
    url: 'https://selvadentrotulum.com',
    urlLabel: 'selvadentrotulum.com',
    logo: { src: '/logo-selvandentro_tulum-cream.webp', alt: 'Selvadentro Tulum', heightClass: 'h-12' },
    logoBg: 'dark',
    videoId: videos.selvadentro,
  },
  {
    name: 'Adhonai by Aguasanta',
    description:
      'A signature boutique development in La Veleta, Tulum — timeless architecture in natural stone, chukum and tzalam wood, from studios to penthouses.',
    url: 'https://www.aguasantatulum.com',
    urlLabel: 'aguasantatulum.com',
    // TEMPORARY: Aguasanta logotype (white PNG). To use the official Adhonai SVG,
    // drop it in the event's folder and point src at it; switch logoBg to
    // 'light' if the new logo is dark.
    logo: { src: `${assetDir}/adhonai-logo.png`, alt: 'Adhonai by Aguasanta', heightClass: 'h-10' },
    logoBg: 'dark',
    videoId: videos.adhonai,
  },
  {
    name: 'TROBBU',
    description:
      'Ten boutique jungle villas in Tulum with private infinity pools and an all-inclusive hotel experience — owned by the week through the TROBBU Owners Club.',
    url: 'https://trobbucollection.com',
    urlLabel: 'trobbucollection.com',
    logo: { src: `${assetDir}/trobbu-logo.svg`, alt: 'TROBBU Boutique Collection', heightClass: 'h-12' },
    logoBg: 'dark',
    videoId: videos.trobbu,
  },
];

const AGENDA_7_TO_9: EventAgendaItem[] = [
  { time: '7:00 PM', title: 'Welcome drinks' },
  { time: '7:30 PM', title: 'Presentations', detail: 'Selvadentro, Adhonai by Aguasanta, TROBBU' },
  { time: '8:30 PM', title: 'Q&A & cocktail' },
  { time: '9:00 PM', title: 'Close' },
];

const faq = (city: string, contactEmail: string): EventFaqItem[] => [
  {
    question: 'Is seating limited?',
    answer:
      'Yes. Seating is limited, so we ask everyone to register in advance. If your plans change, let us know and we will offer your seat to someone else.',
  },
  {
    question: 'Is there a cost to attend?',
    answer: 'No. Entry is free of charge — registration is all we ask.',
  },
  {
    // Confirmed by the team for Toronto and Montreal.
    question: 'Is there a dress code?',
    answer: 'Smart casual.',
  },
  {
    question: 'Where exactly is the event?',
    answer: `In ${city}. The venue is shared only with registered guests — once you sign up, we send you the exact location, parking and transit details with your invitation.`,
    revealsVenue: true,
  },
  {
    question: 'Who can I contact with questions?',
    answer: `Write to ${contactEmail} and we will get back to you.`,
  },
];

const SITE = 'https://lotes.selvadentrotulum.com';
const CONTACT_EMAIL = 'taliah@selvadentrotulum.com';
const PARTNERS = 'Selvadentro, Adhonai by Aguasanta and TROBBU';

// ---------------------------------------------------------------------------
// Toronto — Thursday, Nov 19 2026, 7–9 PM, Gladstone House
// ---------------------------------------------------------------------------

const TORONTO_EVENT: OwningTulumEventConfig['event'] = {
  name: 'Owning Tulum',
  subtitle: 'An Investment Seminar',
  city: 'Toronto',
  dateLabel: 'Thursday, November 19, 2026',
  timeLabel: '7:00 – 9:00 PM (Toronto time)',
  venueName: 'Gladstone House',
  venueStreet: '1214 Queen St W',
  venueAddress: '1214 Queen St W, Toronto, ON M6J 1J6',
  mapUrl: 'https://maps.app.goo.gl/cxBtKjcGS9zixNSH8',
  contactEmail: CONTACT_EMAIL,
  venuePending: 'Toronto · Exact location shared after you register',
  heroImage: '/events/owning-tulum/hero-cenote.webp',
};

export const OWNING_TULUM_TORONTO: OwningTulumEventConfig = {
  path: '/owning-tulum',
  htmlFile: 'owning-tulum.html',
  event: TORONTO_EVENT,
  meta: {
    url: `${SITE}/owning-tulum`,
    title: 'Owning Tulum — An Investment Seminar · Toronto, Nov 19',
    description: `An evening in Toronto to learn how to own in Tulum — with ${PARTNERS}. Thursday, Nov 19, 7 PM. Private event, by registration only.`,
    image: `${SITE}/events/owning-tulum/og-owning-tulum.jpg`,
  },
  // 7:00–9:00 PM in Toronto on Nov 19 2026 (EST, UTC−5).
  calendar: {
    uid: 'owning-tulum-toronto-2026-11-19@selvadentrotulum.com',
    title: 'Owning Tulum — An Investment Seminar',
    start: '20261120T000000Z',
    end: '20261120T020000Z',
    location: `${TORONTO_EVENT.venueName}, ${TORONTO_EVENT.venueAddress}`,
    description: `An evening in Toronto to learn how to own in Tulum — with ${PARTNERS}.\nQuestions: ${CONTACT_EMAIL}`,
    url: `${SITE}/owning-tulum`,
    icsPath: '/events/owning-tulum/owning-tulum.ics',
  },
  form: {
    attendanceQuestion: 'Are you available to join us in person on November 19th in Toronto?',
  },
  webhook: {
    url: 'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/7cf9d992-7736-45c6-aa7b-ae21648b5ffd',
    tag: 'evento-toronto-nov19',
    eventId: 'owning-tulum-toronto-2026-11-19',
    defaultCampaign: 'OWNING-TULUM_TORONTO_NOV19',
  },
  leadContentName: 'owning-tulum',
  learn: LEARN,
  projects: projects('/events/owning-tulum', {
    selvadentro: 'zFNyICgwD5c',
    adhonai: 'Xn_vnxhNGx4',
    trobbu: '0vj0jDj64WA',
  }),
  agenda: AGENDA_7_TO_9,
  faq: faq('Toronto', CONTACT_EMAIL),
};

// ---------------------------------------------------------------------------
// Montreal — Wednesday, Nov 25 2026, 7–9 PM, Yoko Luna
// ---------------------------------------------------------------------------

const MONTREAL_EVENT: OwningTulumEventConfig['event'] = {
  name: 'Owning Tulum',
  subtitle: 'An Investment Seminar',
  city: 'Montreal',
  dateLabel: 'Wednesday, November 25, 2026',
  timeLabel: '7:00 – 9:00 PM (Montreal time)',
  venueName: 'Yoko Luna',
  venueStreet: '1234 Rue de la Montagne',
  venueAddress: '1234 Rue de la Montagne, Montréal, QC H3G 1Z1',
  mapUrl: 'https://maps.app.goo.gl/8JwVm7oceQJXV7a8A',
  contactEmail: CONTACT_EMAIL,
  venuePending: 'Montreal · Exact location shared after you register',
  heroImage: '/events/owning-tulum-montreal/hero-cenote.webp',
};

export const OWNING_TULUM_MONTREAL: OwningTulumEventConfig = {
  path: '/owning-tulum-montreal',
  htmlFile: 'owning-tulum-montreal.html',
  event: MONTREAL_EVENT,
  meta: {
    url: `${SITE}/owning-tulum-montreal`,
    title: 'Owning Tulum — An Investment Seminar · Montreal, Nov 25',
    description: `An evening in Montreal to learn how to own in Tulum — with ${PARTNERS}. Wednesday, Nov 25, 7 PM. Private event, by registration only.`,
    image: `${SITE}/events/owning-tulum-montreal/og-owning-tulum-montreal.jpg`,
  },
  // 7:00–9:00 PM in Montreal on Nov 25 2026 (EST, UTC−5 — DST ended Nov 1).
  calendar: {
    uid: 'owning-tulum-montreal-2026-11-25@selvadentrotulum.com',
    title: 'Owning Tulum — An Investment Seminar',
    start: '20261126T000000Z',
    end: '20261126T020000Z',
    location: `${MONTREAL_EVENT.venueName}, ${MONTREAL_EVENT.venueAddress}`,
    description: `An evening in Montreal to learn how to own in Tulum — with ${PARTNERS}.\nQuestions: ${CONTACT_EMAIL}`,
    url: `${SITE}/owning-tulum-montreal`,
    icsPath: '/events/owning-tulum-montreal/owning-tulum-montreal.ics',
  },
  form: {
    attendanceQuestion: 'Are you available to join us in person on November 25th in Montreal?',
  },
  webhook: {
    // PENDING: URL of the GHL workflow "Owning Tulum - registro web (Montreal Nov 25)".
    // Never Toronto's. While empty, the form refuses to submit (eventWebhook.ts).
    url: '',
    tag: 'evento-montreal-nov25',
    eventId: 'owning-tulum-montreal-2026-11-25',
    defaultCampaign: 'OWNING-TULUM_MONTREAL_NOV25',
  },
  leadContentName: 'owning-tulum-montreal',
  learn: LEARN,
  // Videos: paste each project's YouTube video ID (the part after "v=" or
  // "youtu.be/"). For now, the same videos as Toronto.
  projects: projects('/events/owning-tulum-montreal', {
    selvadentro: 'zFNyICgwD5c',
    adhonai: 'Xn_vnxhNGx4',
    trobbu: '0vj0jDj64WA',
  }),
  agenda: AGENDA_7_TO_9,
  faq: faq('Montreal', CONTACT_EMAIL),
};

/** Every city — the build writes a share HTML and an .ics file for each (vite.config.ts). */
export const OWNING_TULUM_EVENTS: OwningTulumEventConfig[] = [OWNING_TULUM_TORONTO, OWNING_TULUM_MONTREAL];
