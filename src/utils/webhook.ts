import { TrackingParams, trackFormSubmission } from './tracking';

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/crN2IhAuOBAl7D8324yI/webhook-trigger/6e1b31c7-4794-4642-95e6-29cbbd754081";

/**
 * Guarantee the phone we send GHL is in E.164 with the country code prefixed.
 * PhoneInput already does this, but this is a defensive belt for any case where
 * the value reaches us as a bare local number.
 */
const normalizeE164 = (raw: string | undefined, defaultCountryCode = '+52'): string => {
  if (!raw) return '';
  const trimmed = raw.replace(/[\s()\-.]/g, '').trim();
  if (trimmed.startsWith('+')) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  return `${defaultCountryCode}${digits}`;
};

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  intent: string;
  timeline: string;
  budget_range: string;
  language?: string;
}

export const submitToGHL = async (formData: FormData, trackingParams: TrackingParams) => {
  const payload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: normalizeE164(formData.phone),
    country: formData.country,
    language: formData.language || "English",
    "what_attracts_you_most_to_tulum_nature_cenotes_culture_lifestyle_etc": formData.intent,
    "horizonte_de_inversion": formData.timeline,
    "presupuesto__budget": formData.budget_range,
    "contact.source": trackingParams.utm_source || "Google Ads",
    "contact.ad_ctwa_clid": trackingParams.gclid,
    "contact.campaign": trackingParams.utm_campaign,
    utm_medium: trackingParams.utm_medium,
    utm_term: trackingParams.utm_term,
    utm_content: trackingParams.utm_content,
    landing_page: trackingParams.landing_page,
    source_label: "Google Ads",
    campaign_label: trackingParams.utm_campaign || "Direct",
  };

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Webhook submission failed');
    }

    trackFormSubmission({
      email: formData.email,
      phone: formData.phone,
      intent: formData.intent,
      timeline: formData.timeline,
      budget_range: formData.budget_range,
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting to GHL:', error);
    return { success: false, error };
  }
};
