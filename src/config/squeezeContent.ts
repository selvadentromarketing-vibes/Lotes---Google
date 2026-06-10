import { SqueezeAngle } from '../utils/squeezeWebhook';

/**
 * Copy and visual content for the 4 squeeze landing variants — bilingual.
 * Spanish was sourced from EPPC_Selvadentro_Landing-Page-Testing PDF §2.5.
 * English added in the bilingual revamp.
 *
 * Background images are placeholder Unsplash URLs — swap for real Selvadentro photography.
 */

export type SqueezeLang = 'es' | 'en';
export const SQUEEZE_LANGS: SqueezeLang[] = ['es', 'en'];

export interface SqueezeContent {
  slug: SqueezeAngle;
  eyebrow: string;
  headline: string;
  subhead: string;
  heroImage: string;
  ctaLabel: string;
  highlights: string[];
}

type ContentByLang = Record<SqueezeLang, SqueezeContent>;

export const SQUEEZE_CONTENT: Record<SqueezeAngle, ContentByLang> = {
  escape: {
    es: {
      slug: 'escape',
      eyebrow: 'Selvadentro · Tulum',
      headline: 'Tu propio terreno en la selva de Tulum.',
      subhead: 'Con cenotes naturales. Desde $70,000 USD. Financiamiento a 48 meses sin intereses.',
      heroImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1800&q=80',
      ctaLabel: 'Ver disponibilidad y precios',
      highlights: [
        '9 cenotes naturales · solo 35% edificable',
        '+134% apreciación confirmada (Fase 1 → 4)',
        '48 meses · 0% interés · escritura pública garantizada',
      ],
    },
    en: {
      slug: 'escape',
      eyebrow: 'Selvadentro · Tulum',
      headline: 'Your own lot in the Tulum jungle.',
      subhead: 'With natural cenotes. From $70,000 USD. 48-month financing, 0% interest.',
      heroImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1800&q=80',
      ctaLabel: 'See availability and pricing',
      highlights: [
        '9 natural cenotes · only 35% buildable',
        '+134% confirmed appreciation (Phase 1 → 4)',
        '48 months · 0% interest · public deed guaranteed',
      ],
    },
  },
  'oportunidad-perdida': {
    es: {
      slug: 'oportunidad-perdida',
      eyebrow: 'La ventana se está cerrando',
      headline: 'En 2012, un lote en Aldea Zama costaba $100 USD x m². Hoy cuesta $650 USD por m².',
      subhead: 'Los lotes en Selvadentro están en esa misma ventana. Fase 1 desde $70,000 USD.',
      heroImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1800&q=80',
      ctaLabel: 'Ver precios de Fase 1',
      highlights: [
        '+134% apreciación Fase 1 → 4 (confirmada)',
        'Solo 8 lotes restantes al precio de Fase 1',
        'Desarrollador con 12 proyectos entregados',
      ],
    },
    en: {
      slug: 'oportunidad-perdida',
      eyebrow: 'The window is closing',
      headline: 'In 2012, an Aldea Zama lot cost $100 USD/m². Today it costs $650 USD/m².',
      subhead: 'Selvadentro lots are in that same window. Phase 1 starting at $70,000 USD.',
      heroImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1800&q=80',
      ctaLabel: 'See Phase 1 pricing',
      highlights: [
        '+134% Phase 1 → 4 appreciation (confirmed)',
        'Only 8 lots left at Phase 1 pricing',
        'Developer with 12 delivered projects',
      ],
    },
  },
  accesibilidad: {
    es: {
      slug: 'accesibilidad',
      eyebrow: 'Más accesible de lo que crees',
      headline: '48 meses sin intereses.',
      subhead:
        'Tu terreno en Tulum por menos de lo que imaginas. Desde $70,000 USD con financiamiento directo del desarrollador.',
      heroImage: 'https://images.unsplash.com/photo-1602002418679-a4e2e2c5dd25?w=1800&q=80',
      ctaLabel: 'Calcular mi plan de pagos',
      highlights: [
        'Financiamiento directo · 0% interés · 48 meses',
        'Enganche desde 20% · sin trámites bancarios',
        'Escritura pública garantizada al término',
      ],
    },
    en: {
      slug: 'accesibilidad',
      eyebrow: 'More accessible than you think',
      headline: '48 months, no interest.',
      subhead:
        'Your lot in Tulum for less than you imagine. From $70,000 USD with direct developer financing.',
      heroImage: 'https://images.unsplash.com/photo-1602002418679-a4e2e2c5dd25?w=1800&q=80',
      ctaLabel: 'Calculate my payment plan',
      highlights: [
        'Direct financing · 0% interest · 48 months',
        '20% down · no bank paperwork',
        'Public deed guaranteed at completion',
      ],
    },
  },
  seguridad: {
    es: {
      slug: 'seguridad',
      eyebrow: 'Inversión respaldada',
      headline: 'Terrenos residenciales con certeza jurídica completa',
      subhead: 'Desarrollador con 12 proyectos entregados. No es una promesa, es un track record.',
      heroImage: 'https://images.unsplash.com/photo-1574707722362-44b59c9c5f4d?w=1800&q=80',
      ctaLabel: 'Hablar con un asesor',
      highlights: [
        '20+ años en bienes raíces en la Riviera Maya',
        '12 proyectos entregados · 100% escrituras',
        'Fideicomiso bancario para compradores extranjeros',
      ],
    },
    en: {
      slug: 'seguridad',
      eyebrow: 'A backed investment',
      headline: 'Residential lots with complete legal certainty',
      subhead: 'Developer with 12 delivered projects. Not a promise — a track record.',
      heroImage: 'https://images.unsplash.com/photo-1574707722362-44b59c9c5f4d?w=1800&q=80',
      ctaLabel: 'Talk to an advisor',
      highlights: [
        '20+ years in Riviera Maya real estate',
        '12 projects delivered · 100% deeded',
        'Bank trust (fideicomiso) for foreign buyers',
      ],
    },
  },
};

export const SQUEEZE_SLUGS: SqueezeAngle[] = [
  'escape',
  'oportunidad-perdida',
  'accesibilidad',
  'seguridad',
];

export const SQUEEZE_VSL_MEDIA_ID = 'jn8el9or7a';

// Boilerplate strings reused across SqueezeLayout, SqueezeForm, and SqueezeThankYou.
export const SQUEEZE_LAYOUT_T: Record<SqueezeLang, {
  trustYears: string;
  trustProjects: string;
  trustDeeded: string;
  closingTitle: string;
  closingBody: string;
  formTitle: string;
  formSubtitle: string;
  fieldFirstName: string;
  placeholderFirstName: string;
  fieldLastName: string;
  placeholderLastName: string;
  fieldPhone: string;
  placeholderPhone: string;
  fieldEmail: string;
  placeholderEmail: string;
  fieldBudget: string;
  placeholderBudget: string;
  fieldTimeline: string;
  placeholderTimeline: string;
  timelineImmediately: string;
  devBlockEyebrow: string;
  devBlockTitle: string;
  devBlockBody: string;
  devBlockProjectsLabel: string;
  submitting: string;
  consent: string;
  errorMissing: string;
  errorPhone: string;
  errorSubmit: string;
  successTitle: string;
  successBody: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  thankYouTitle: string;
  thankYouBody: string;
  thankYouWhatsappShort: string;
  thankYouWhatsappLong: string;
  thankYouHomeCta: string;
  thankYouWhatsappMessage: string;
  thankYouNextTitle: string;
  thankYouNext1: string;
  thankYouNext2: string;
  thankYouNext3: string;
  thankYouBack: string;
  thankYouDocTitle: string;
}> = {
  es: {
    trustYears: 'años en bienes raíces',
    trustProjects: 'proyectos entregados',
    trustDeeded: 'escrituras',
    closingTitle: '¿Listo para asegurar tu lote?',
    closingBody: 'Solo quedan 8 lotes al precio de Fase 1. Cada 10 lotes vendidos, el precio sube 1%.',
    formTitle: 'Ver disponibilidad',
    formSubtitle: 'Te llamamos en menos de 24 horas con precios y plan de pagos.',
    fieldFirstName: 'Nombre',
    placeholderFirstName: 'Tu nombre',
    fieldLastName: 'Apellido',
    placeholderLastName: 'Tu apellido',
    fieldPhone: 'Teléfono',
    placeholderPhone: '999 489 0828',
    fieldEmail: 'Email',
    placeholderEmail: 'tu@email.com',
    fieldBudget: 'Presupuesto',
    placeholderBudget: 'Selecciona un rango',
    fieldTimeline: 'Plazo de inversión',
    placeholderTimeline: 'Selecciona un plazo',
    timelineImmediately: 'Inmediatamente',
    devBlockEyebrow: 'Quién está detrás',
    devBlockTitle: 'Más de 20 años entregando comunidades en el sureste mexicano',
    devBlockBody:
      'Nuestro portafolio incluye Aldea Zama en Tulum y el Yucatán Country Club en Mérida — comunidades que hoy son referencia en plusvalía y entrega. Cuando inviertes con Selvadentro, inviertes con un track record real, no con una promesa.',
    devBlockProjectsLabel: 'Proyectos de referencia',
    submitting: 'Enviando...',
    consent: 'Al enviar aceptas que un asesor de Selvadentro te contacte. No compartimos tus datos.',
    errorMissing: 'Por favor completa todos los campos.',
    errorPhone: 'Por favor ingresa un teléfono válido (incluye lada).',
    errorSubmit:
      'No pudimos enviar tu solicitud. Por favor intenta de nuevo o llámanos al +52 999 489 0828.',
    successTitle: '¡Listo!',
    successBody: 'Tu solicitud se envió. Un asesor te contactará en menos de 24 horas.',
    testimonialsEyebrow: 'Inversionistas Selvadentro',
    testimonialsTitle: 'Otros ya tomaron la decisión',
    thankYouTitle: 'Solicitud recibida',
    thankYouBody:
      'Un asesor de Selvadentro se pondrá en contacto contigo en menos de 24 horas con disponibilidad, precios y opciones de plan de pago.',
    thankYouWhatsappShort: 'Mensaje por WhatsApp',
    thankYouWhatsappLong: 'Enviar mensaje por WhatsApp',
    thankYouHomeCta: 'Conocer Selvadentro',
    thankYouWhatsappMessage: 'Hola, me interesa conocer más sobre Selvadentro Tulum',
    thankYouNextTitle: '¿Qué sigue?',
    thankYouNext1: 'Un asesor revisará disponibilidad de lotes según tus preferencias.',
    thankYouNext2: 'Te contactaremos por WhatsApp o llamada en menos de 24 horas.',
    thankYouNext3: 'Si quieres adelantar, escríbenos directamente al WhatsApp arriba.',
    thankYouBack: '← Volver al inicio',
    thankYouDocTitle: 'Solicitud recibida',
  },
  en: {
    trustYears: 'years in real estate',
    trustProjects: 'projects delivered',
    trustDeeded: 'deeded',
    closingTitle: 'Ready to lock in your lot?',
    closingBody: 'Only 8 lots remain at Phase 1 pricing. The price rises 1% every 10 lots sold.',
    formTitle: 'Check availability',
    formSubtitle: 'We call you within 24 hours with pricing and payment plan.',
    fieldFirstName: 'First name',
    placeholderFirstName: 'Your first name',
    fieldLastName: 'Last name',
    placeholderLastName: 'Your last name',
    fieldPhone: 'Phone',
    placeholderPhone: '999 489 0828',
    fieldEmail: 'Email',
    placeholderEmail: 'you@email.com',
    fieldBudget: 'Budget range',
    placeholderBudget: 'Select a range',
    fieldTimeline: 'Investment timeline',
    placeholderTimeline: 'Select a timeline',
    timelineImmediately: 'Immediately',
    devBlockEyebrow: 'Who’s behind Selvadentro',
    devBlockTitle: 'Over 20 years delivering communities across southeast Mexico',
    devBlockBody:
      'Our portfolio includes Aldea Zama in Tulum and Yucatán Country Club in Mérida — communities that today set the benchmark for appreciation and delivery. When you invest with Selvadentro, you invest with a real track record, not a promise.',
    devBlockProjectsLabel: 'Reference projects',
    submitting: 'Sending...',
    consent: 'By submitting you agree that a Selvadentro advisor will contact you. We never share your data.',
    errorMissing: 'Please fill out every field.',
    errorPhone: 'Please enter a valid phone number (include country code).',
    errorSubmit:
      'We couldn’t send your request. Please try again or call us at +52 999 489 0828.',
    successTitle: 'All set!',
    successBody: 'Your request was sent. An advisor will contact you within 24 hours.',
    testimonialsEyebrow: 'Selvadentro investors',
    testimonialsTitle: 'Others already made the decision',
    thankYouTitle: 'Request received',
    thankYouBody:
      'A Selvadentro advisor will contact you within 24 hours with availability, pricing, and payment plan options.',
    thankYouWhatsappShort: 'WhatsApp message',
    thankYouWhatsappLong: 'Message us on WhatsApp',
    thankYouHomeCta: 'Discover Selvadentro',
    thankYouWhatsappMessage: 'Hi, I’d like to learn more about Selvadentro Tulum',
    thankYouNextTitle: 'What’s next?',
    thankYouNext1: 'An advisor will review lot availability based on your preferences.',
    thankYouNext2: 'We’ll reach out by WhatsApp or phone within 24 hours.',
    thankYouNext3: 'Want to fast-track? Message us directly via WhatsApp above.',
    thankYouBack: '← Back to home',
    thankYouDocTitle: 'Request received',
  },
};
