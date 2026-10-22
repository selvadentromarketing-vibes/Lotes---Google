import { parsePhoneNumber } from 'react-phone-number-input';
import { TrackingParams, getVisitorOrigin } from './tracking';
import {
  SQUEEZE_GHL_WEBHOOK_URL,
  LANGUAGE_FOR_GHL,
  normalizeE164,
  type BudgetOption,
} from './squeezeWebhook';

/**
 * Registrations for the in-person event at /owning-tulum. They go to the SAME
 * GHL webhook as the squeeze landings, with the same payload keys, so the
 * existing field mapping (UTMs, budget, click IDs, origin) applies unchanged.
 */

/** Sent as utm_campaign when the visitor arrives without one of their own. */
export const OWNING_TULUM_DEFAULT_CAMPAIGN = 'OWNING-TULUM_TORONTO_NOV19';
/** GHL tag and source label on every registration from this page. */
export const OWNING_TULUM_SOURCE_LABEL = 'evento-toronto-nov19';

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

/** Country name from the phone's country code ("Canada", "United States"…); GHL stores it as a code. */
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
  const origin = getVisitorOrigin();
  const utmCampaign = tracking.utm_campaign || OWNING_TULUM_DEFAULT_CAMPAIGN;
  const payload = {
    // Contact basics
    first_name: formData.first_name,
    last_name: formData.last_name,
    name: `${formData.first_name} ${formData.last_name}`.trim(),
    email: formData.email,
    phone: normalizeE164(formData.phone, '+1'),
    country: countryFromPhone(formData.phone),
    language: LANGUAGE_FOR_GHL.en,

    // Qualifiers. budget values match the GHL "Budget Range" dropdown (USD tiers).
    budget: formData.budget,
    budget_range: formData.budget, // GHL field alias
    visited_tulum: formData.visited_tulum,

    // Event attribution. `angle` is what fills the contact "Campaign" field for squeeze leads.
    angle: OWNING_TULUM_SOURCE_LABEL,
    source_label: OWNING_TULUM_SOURCE_LABEL,
    form_name: `${OWNING_TULUM_SOURCE_LABEL}-form`,

    // Tracking — first-visit origin (see getVisitorOrigin); page_url is the page the form was sent from
    referrer: origin.referrer,
    landing_page: origin.landing_page,
    page_url: tracking.landing_page,

    // Tracking — UTMs
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: utmCampaign,
    utm_term: tracking.utm_term,
    utm_content: tracking.utm_content,

    // Tracking — click IDs
    gclid: tracking.gclid,
    fbclid: tracking.fbclid,

    // Tracking — ad structure
    ad_id: tracking.ad_id,
    ad_source_id: tracking.ad_id,
    adset_id: tracking.adset_id,
    campaign_id: tracking.campaign_id,
    search_term: tracking.search_term,

    // GHL-mapped contact fields. Ad traffic keeps its utm_source as the source;
    // everyone else is labelled with the event.
    'contact.source': tracking.utm_source || OWNING_TULUM_SOURCE_LABEL,
    'contact.campaign': utmCampaign,
    'contact.ad_ctwa_clid': tracking.fbclid || tracking.gclid,
    campaign_label: utmCampaign,

    // Tags
    tags: [OWNING_TULUM_SOURCE_LABEL],
  };

  try {
    const response = await fetch(SQUEEZE_GHL_WEBHOOK_URL, {
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
