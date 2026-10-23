import { parsePhoneNumber } from 'react-phone-number-input';
import { TrackingParams, getVisitorOrigin } from './tracking';
import { LANGUAGE_FOR_GHL, normalizeE164, type BudgetOption } from './squeezeWebhook';

/**
 * Registrations for the in-person event at /owning-tulum. They go to the event's
 * own GHL webhook — not the lots webhook in squeezeWebhook.ts — so they never
 * enter the lots flow. Only this page posts here.
 */
export const EVENT_GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/7cf9d992-7736-45c6-aa7b-ae21648b5ffd';

/** Sent as utm_campaign when the visitor arrives without one of their own. */
const OWNING_TULUM_DEFAULT_CAMPAIGN = 'OWNING-TULUM_TORONTO_NOV19';
const OWNING_TULUM_TAG = 'evento-toronto-nov19';
const OWNING_TULUM_EVENT_ID = 'owning-tulum-toronto-2026-11-19';

export const VISITED_TULUM_OPTIONS = ['Yes', 'No'] as const;
export type VisitedTulumOption = typeof VISITED_TULUM_OPTIONS[number];

export interface EventRegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  budget: BudgetOption;
  visited_tulum: VisitedTulumOption;
}

/**
 * The flat JSON the event workflow in GHL is mapped against: exactly these
 * keys, all strings. A value we don't have is sent as '' — a key is never
 * left out.
 */
interface EventWebhookPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  budget: string;
  visited_tulum: string;
  language: string;
  landing_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  gclid: string;
  referrer: string;
  tag: string;
  event: string;
}

/** Country name from the phone's country code ("Canada", "United States"…). */
const countryFromPhone = (phone: string): string => {
  try {
    const code = parsePhoneNumber(phone)?.country;
    return code ? new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? '' : '';
  } catch {
    return '';
  }
};

export const submitEventRegistration = async (
  formData: EventRegistrationData,
  tracking: TrackingParams,
): Promise<{ success: boolean; error?: unknown }> => {
  const payload: EventWebhookPayload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: normalizeE164(formData.phone, '+1'),
    country: countryFromPhone(formData.phone),
    budget: formData.budget,
    visited_tulum: formData.visited_tulum,
    // GHL language dropdown value (Spanish words): "Inglés".
    language: LANGUAGE_FOR_GHL.en,
    // The page the form was sent from, query string included.
    landing_page: tracking.landing_page,
    utm_source: tracking.utm_source ?? '',
    utm_medium: tracking.utm_medium ?? '',
    utm_campaign: tracking.utm_campaign || OWNING_TULUM_DEFAULT_CAMPAIGN,
    utm_content: tracking.utm_content ?? '',
    utm_term: tracking.utm_term ?? '',
    fbclid: tracking.fbclid ?? '',
    gclid: tracking.gclid ?? '',
    // Domain the visitor first arrived from (kept 90 days, see getVisitorOrigin).
    referrer: getVisitorOrigin().referrer,
    tag: OWNING_TULUM_TAG,
    event: OWNING_TULUM_EVENT_ID,
  };

  try {
    const response = await fetch(EVENT_GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Event webhook returned ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Event registration failed:', error);
    return { success: false, error };
  }
};
