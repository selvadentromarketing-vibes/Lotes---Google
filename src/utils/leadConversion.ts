import type { SqueezeAngle } from './squeezeWebhook';
import type { SqueezeLang } from '../config/squeezeContent';

/**
 * Lead conversions: Meta Pixel `Lead` and Google Ads "Submit lead form".
 *
 * The forms fire them right after the GHL webhook answers OK, never the
 * thank-you pages, so reloading or reopening /thank-you or /gracias/<angle>
 * counts nothing. Each submission gets its own id, sent as Meta's eventID and
 * as Google Ads' transaction_id, so both platforms drop a repeat of it.
 */
const GOOGLE_ADS_ID = 'AW-16717627054';
const LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/4jnsCKrQ3dQbEK79yqM-`;
// Longest a redirect waits for the Google Ads hit before leaving the page.
const CONVERSION_WAIT_MS = 2000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export const newLeadEventId = (): string =>
  crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

/** Resolves once the Google Ads hit is out (or after CONVERSION_WAIT_MS), so a redirect can't cut it off. */
export const trackLeadConversion = (eventId: string, metaParams: Record<string, unknown> = {}) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, CONVERSION_WAIT_MS);
    window.fbq?.('track', 'Lead', metaParams, { eventID: eventId });
    window.gtag?.('event', 'conversion', {
      send_to: LEAD_CONVERSION_SEND_TO,
      transaction_id: eventId,
      event_callback: () => resolve(),
    });
  });

/*
 * /accesibilidad (Spanish), where Google Ads MX sends traffic, also loads the
 * Google Ads tag up front and pushes `lead` to the dataLayer, as
 * seguridad.selvadentrotulum.com does. GTM-5MJKSKHD has no Google Ads tag, so
 * none of this goes through GTM.
 */
export const reportsLeadToGoogleAds = (angle: SqueezeAngle, lang: SqueezeLang) =>
  angle === 'accesibilidad' && lang === 'es';

export const loadGoogleAdsTag = () => {
  window.gtag?.('config', GOOGLE_ADS_ID);
};

export const pushLeadToDataLayer = (angle: SqueezeAngle) => {
  window.dataLayer?.push({ event: 'lead', landing: angle, variant: angle });
};
