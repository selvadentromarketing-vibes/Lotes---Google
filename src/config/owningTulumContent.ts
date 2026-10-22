/**
 * Copy and settings for the in-person event landing at /owning-tulum —
 * "Owning Tulum — An Investment Seminar", Toronto, Nov 19 2026. English only.
 *
 * Everything the team is expected to edit (partner logos, agenda, FAQ) lives
 * here, so the page component never needs touching for copy changes.
 */

export const OWNING_TULUM_EVENT = {
  name: 'Owning Tulum',
  subtitle: 'An Investment Seminar',
  dateLabel: 'Thursday, November 19, 2026',
  timeLabel: '7:00 – 9:00 PM (Toronto time)',
  venueName: 'Gladstone House',
  venueStreet: '1214 Queen St W',
  venueAddress: '1214 Queen St W, Toronto, ON M6J 1J6',
  mapUrl: 'https://maps.app.goo.gl/cxBtKjcGS9zixNSH8',
  contactEmail: 'taliah@selvadentrotulum.com',
  heroImage: '/7-selvandentro_tulum.webp',
};

/**
 * Title, description and share image for /owning-tulum. Link previews
 * (WhatsApp, Facebook, LinkedIn…) read them from owning-tulum.html, which the
 * build writes from index.html — see vite.config.ts. The page also uses the title.
 */
export const OWNING_TULUM_META = {
  url: 'https://lotes.selvadentrotulum.com/owning-tulum',
  title: 'Owning Tulum — An Investment Seminar · Toronto, Nov 19',
  description:
    'An evening in Toronto to learn how to own in Tulum — with Selvadentro, Adhonai by Aguasanta and TROBBU. Thursday, Nov 19, 7 PM, Gladstone House.',
  // 1200×630. Absolute URL: several crawlers ignore relative image paths.
  image: 'https://lotes.selvadentrotulum.com/events/owning-tulum/og-owning-tulum.jpg',
};

export const OWNING_TULUM_LEARN = [
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
}

export const OWNING_TULUM_PROJECTS: EventProject[] = [
  {
    name: 'Selvadentro',
    role: 'Host',
    description:
      "Cenote-centered residential lots in Tulum's jungle — a low-density master plan with 9 cenotes.",
    url: 'https://selvadentrotulum.com',
    urlLabel: 'selvadentrotulum.com',
    logo: { src: '/logo-selvandentro_tulum-cream.webp', alt: 'Selvadentro Tulum', heightClass: 'h-12' },
    logoBg: 'dark',
  },
  {
    name: 'Adhonai by Aguasanta',
    description:
      'A signature boutique development in La Veleta, Tulum — timeless architecture in natural stone, chukum and tzalam wood, from studios to penthouses.',
    url: 'https://www.aguasantatulum.com',
    urlLabel: 'aguasantatulum.com',
    // TEMPORARY: Aguasanta logotype (white PNG). To use the official Adhonai SVG,
    // drop it in public/events/owning-tulum/ and point src at it; switch logoBg to
    // 'light' if the new logo is dark.
    logo: { src: '/events/owning-tulum/adhonai-logo.png', alt: 'Adhonai by Aguasanta', heightClass: 'h-10' },
    logoBg: 'dark',
  },
  {
    name: 'TROBBU',
    description:
      'Ten boutique jungle villas in Tulum with private infinity pools and an all-inclusive hotel experience — owned by the week through the TROBBU Owners Club.',
    url: 'https://trobbucollection.com',
    urlLabel: 'trobbucollection.com',
    logo: { src: '/events/owning-tulum/trobbu-logo.svg', alt: 'TROBBU Boutique Collection', heightClass: 'h-12' },
    logoBg: 'dark',
  },
];

export const OWNING_TULUM_AGENDA: { time: string; title: string; detail?: string }[] = [
  { time: '7:00 PM', title: 'Welcome drinks' },
  { time: '7:30 PM', title: 'Presentations', detail: 'Selvadentro, Adhonai by Aguasanta, TROBBU' },
  { time: '8:30 PM', title: 'Q&A & cocktail' },
  { time: '9:00 PM', title: 'Close' },
];

export const OWNING_TULUM_FAQ = [
  {
    question: 'Is seating limited?',
    answer:
      'Yes. Seating at Gladstone House is limited, so we ask everyone to register in advance. If your plans change, let us know and we will offer your seat to someone else.',
  },
  {
    question: 'Is there a cost to attend?',
    answer: 'No. Entry is free of charge — registration is all we ask.',
  },
  {
    // TO CONFIRM with the team.
    question: 'Is there a dress code?',
    answer: 'Smart casual.',
  },
  {
    // TO CONFIRM with the venue: rate and whether event guests can reserve.
    question: 'Is there parking?',
    answer:
      'Gladstone House has limited paid parking on site, and there is paid street parking nearby. The 501 Queen streetcar stops at Gladstone Avenue, right outside.',
  },
  {
    question: 'Who can I contact with questions?',
    answer: `Write to ${OWNING_TULUM_EVENT.contactEmail} and we will get back to you.`,
  },
];
