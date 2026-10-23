import { BUDGET_OPTIONS_USD, TIMELINE_OPTIONS } from './squeezeWebhook';

/**
 * Main form (lotes-main-form) options. The VALUES sent to GHL are the same labels as the
 * GHL "Budget Range" / "Investment Timeline" dropdowns and the squeeze forms, so all three
 * webhooks write identical options. Only what the visitor sees is translated.
 */
export const MAIN_BUDGET_OPTIONS = BUDGET_OPTIONS_USD;
export const MAIN_TIMELINE_OPTIONS = TIMELINE_OPTIONS;
export const TIMELINE_LABELS: Record<'en' | 'es', Record<string, string>> = {
  en: { 'Immediately': 'Immediately', '0-3 meses': '0–3 months', '3-6 meses': '3–6 months', '6-12 meses': '6–12 months', '12+ meses': '12+ months' },
  es: { 'Immediately': 'Inmediatamente', '0-3 meses': '0–3 meses', '3-6 meses': '3–6 meses', '6-12 meses': '6–12 meses', '12+ meses': '12+ meses' },
};

/** What the form hands to the thank-you page (react-router location state). */
export interface ThankYouState { n?: string; ref?: string }

/**
 * WhatsApp text of the main thank-you page. It carries the first name and the campaign so
 * that, when the visitor writes from a number other than the one in the form (GHL then
 * creates a second contact), the Calidad de Leads report can tie it back to the form lead:
 * it reads "I'm X" / "soy X" and "(ref: CAMPAIGN)". The wording keeps the phrase the CRM
 * already treats as the button's default text, so it is not counted as a reply.
 */
export const whatsappThankYou = (lang: 'en' | 'es', st: ThankYouState): string => {
  const n = (st.n || '').trim().split(/\s+/)[0] || '';
  const ref = (st.ref || '').trim();
  const base = lang === 'es'
    ? (n ? `Hola, soy ${n}. Me interesa conocer más sobre Selvadentro Tulum` : 'Hola, me interesa conocer más sobre Selvadentro Tulum')
    : (n ? `Hi, I'm ${n}. I'd like to learn more about Selvadentro Tulum` : "Hi, I'd like to learn more about Selvadentro Tulum");
  return ref ? `${base} (ref: ${ref})` : base;
};
