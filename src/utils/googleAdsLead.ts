import type { SqueezeAngle } from './squeezeWebhook';
import type { SqueezeLang } from '../config/squeezeContent';

/**
 * Google Ads "Submit lead form" conversion fired from the squeeze form itself,
 * once the GHL webhook answers OK — the same way seguridad.selvadentrotulum.com
 * does it from its config.js: gtag configured directly with the Ads ID, then a
 * `lead` event in the dataLayer plus the conversion hit. GTM-5MJKSKHD has no
 * Google Ads tag, so none of this goes through GTM.
 *
 * Only /accesibilidad (Spanish) for now: Google Ads MX sends traffic there.
 * /gracias/<angle> still sends this same conversion too; Google Ads keeps one
 * of the two because "Submit lead form" counts one conversion per click.
 * Switching that action to "every" would count each lead twice.
 */
const GOOGLE_ADS_ID = 'AW-16717627054';
const LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/4jnsCKrQ3dQbEK79yqM-`;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const reportsLeadToGoogleAds = (angle: SqueezeAngle, lang: SqueezeLang) =>
  angle === 'accesibilidad' && lang === 'es';

export const loadGoogleAdsTag = () => {
  window.gtag?.('config', GOOGLE_ADS_ID);
};

export const trackGoogleAdsLead = (angle: SqueezeAngle) => {
  window.gtag?.('event', 'conversion', { send_to: LEAD_CONVERSION_SEND_TO });
  window.dataLayer?.push({ event: 'lead', landing: angle, variant: angle });
};
