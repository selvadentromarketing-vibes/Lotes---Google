import { SqueezeAngle } from '../utils/squeezeWebhook';

/**
 * Copy and visual content for the 4 squeeze landing variants.
 * Headlines sourced from EPPC_Selvadentro_Landing-Page-Testing PDF §2.5.
 * Background images are placeholder Unsplash URLs — replace with real Selvadentro photography.
 */

export interface SqueezeContent {
  slug: SqueezeAngle;
  eyebrow: string;
  headline: string;
  subhead: string;
  heroImage: string; // Unsplash placeholder — swap for real Selvadentro photography
  ctaLabel: string;
  highlights: string[]; // 3 short USPs surfaced under the VSL
}

export const SQUEEZE_CONTENT: Record<SqueezeAngle, SqueezeContent> = {
  escape: {
    slug: 'escape',
    eyebrow: 'Selvadentro · Tulum',
    headline: 'Tu propio terreno en la selva de Tulum.',
    subhead:
      'Con cenotes naturales. Desde $70,000 USD. Financiamiento a 48 meses sin intereses.',
    heroImage:
      'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1800&q=80',
    ctaLabel: 'Ver disponibilidad y precios',
    highlights: [
      '9 cenotes naturales · solo 35% edificable',
      '+134% apreciación confirmada (Fase 1 → 4)',
      '48 meses · 0% interés · escritura pública garantizada',
    ],
  },
  'oportunidad-perdida': {
    slug: 'oportunidad-perdida',
    eyebrow: 'La ventana se está cerrando',
    headline: 'En 2020, un lote en Aldea Zama costaba X. Hoy cuesta 3X.',
    subhead:
      'Los lotes en Selvadentro están en esa misma ventana. Fase 1 desde $70,000 USD.',
    heroImage:
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1800&q=80',
    ctaLabel: 'Ver precios de Fase 1',
    highlights: [
      '+134% apreciación Fase 1 → 4 (confirmada)',
      'Solo 8 lotes restantes al precio de Fase 1',
      'Desarrollador con 12 proyectos entregados',
    ],
  },
  accesibilidad: {
    slug: 'accesibilidad',
    eyebrow: 'Más accesible de lo que crees',
    headline: '48 meses sin intereses.',
    subhead:
      'Tu terreno en Tulum por menos de lo que imaginas. Desde $70,000 USD con financiamiento directo del desarrollador.',
    heroImage:
      'https://images.unsplash.com/photo-1602002418679-a4e2e2c5dd25?w=1800&q=80',
    ctaLabel: 'Calcular mi plan de pagos',
    highlights: [
      'Financiamiento directo · 0% interés · 48 meses',
      'Enganche desde 20% · sin trámites bancarios',
      'Escritura pública garantizada al término',
    ],
  },
  seguridad: {
    slug: 'seguridad',
    eyebrow: 'Inversión respaldada',
    headline: 'Escritura pública garantizada.',
    subhead:
      'Desarrollador con 12 proyectos entregados. No es una promesa, es un track record.',
    heroImage:
      'https://images.unsplash.com/photo-1574707722362-44b59c9c5f4d?w=1800&q=80',
    ctaLabel: 'Hablar con un asesor',
    highlights: [
      '20+ años en bienes raíces en la Riviera Maya',
      '12 proyectos entregados · 100% escrituras',
      'Fideicomiso bancario para compradores extranjeros',
    ],
  },
};

export const SQUEEZE_SLUGS: SqueezeAngle[] = [
  'escape',
  'oportunidad-perdida',
  'accesibilidad',
  'seguridad',
];

// Wistia media ID (Spanish VSL — from investorsLP/eventos/madrid.html)
export const SQUEEZE_VSL_MEDIA_ID = 'jn8el9or7a';
