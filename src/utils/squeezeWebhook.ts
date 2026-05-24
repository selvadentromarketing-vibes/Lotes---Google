import { TrackingParams } from './tracking';

/**
 * GHL inbound webhook for the squeeze landings at lotes.selvadentrotulum.com/{angle}.
 * This is intentionally SEPARATE from the existing webhook.ts used by /, /es and the
 * MultiStepForm. Do not consolidate without checking GHL field mapping first.
 *
 * Field mapping in GHL was set up using a test payload (see /Users/wififunded/.claude/plans/
 * users-wififunded-downloads-eppc-selvade-elegant-chipmunk.md). Verify in GHL before changes.
 */
const SQUEEZE_GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/9270085e-204b-40e0-a565-b2bf60861970';

export type SqueezeAngle =
  | 'escape'
  | 'oportunidad-perdida'
  | 'accesibilidad'
  | 'seguridad';

export interface SqueezeFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface SqueezeSubmissionResult {
  success: boolean;
  error?: unknown;
}

// `gtag` is already declared in ./tracking.ts — don't redeclare or types conflict.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const fireLeadEvents = (angle: SqueezeAngle, formData: SqueezeFormData) => {
  // Google Analytics / Google Ads conversion
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 0,
      event_category: 'Squeeze',
      event_label: `squeeze-${angle}`,
      angle,
    });
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: `squeeze-${angle}`,
      content_category: 'squeeze',
    });
  }
  // Defensive: avoid unused-var lint by referencing email/phone shapes
  void formData;
};

export const submitSqueezeLead = async (
  angle: SqueezeAngle,
  formData: SqueezeFormData,
  tracking: TrackingParams,
): Promise<SqueezeSubmissionResult> => {
  const payload = {
    // Contact basics
    first_name: formData.first_name,
    last_name: formData.last_name,
    name: `${formData.first_name} ${formData.last_name}`.trim(),
    email: formData.email,
    phone: formData.phone,
    country: 'Mexico',
    language: 'Spanish',

    // Squeeze attribution
    angle,
    source_label: `squeeze-${angle}`,
    form_name: `squeeze-${angle}-form`,

    // Tracking
    landing_page: tracking.landing_page,
    page_url: tracking.landing_page,
    utm_source: tracking.utm_source,
    utm_medium: tracking.utm_medium,
    utm_campaign: tracking.utm_campaign,
    utm_term: tracking.utm_term,
    utm_content: tracking.utm_content,
    gclid: tracking.gclid,

    // GHL-mapped fields (mirrors existing webhook.ts conventions)
    'contact.source': tracking.utm_source || 'Meta Ads - Squeeze',
    'contact.campaign': tracking.utm_campaign,
    'contact.ad_ctwa_clid': tracking.gclid,
    campaign_label: tracking.utm_campaign || 'Direct',

    // Tags
    tags: ['squeeze', angle],
  };

  try {
    const response = await fetch(SQUEEZE_GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Squeeze webhook returned ${response.status}`);
    }

    fireLeadEvents(angle, formData);
    return { success: true };
  } catch (error) {
    console.error('Squeeze submission failed:', error);
    return { success: false, error };
  }
};
