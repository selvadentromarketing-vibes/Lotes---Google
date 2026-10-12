export interface TrackingParams {
  // Google + Facebook click IDs
  gclid?: string;
  fbclid?: string;
  // UTM marketing params
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  // Facebook ad structure IDs (populated via {{ad.id}} / {{adset.id}} / {{campaign.id}}
  // dynamic params on the Meta Ads URL template).
  ad_id?: string;
  adset_id?: string;
  campaign_id?: string;
  // Google search term (populated via {keyword} dynamic param on Google Ads).
  search_term?: string;
  // Always captured
  landing_page: string;
}

const pickFirst = (url: URLSearchParams, keys: string[]): string | undefined => {
  for (const k of keys) {
    const v = url.get(k);
    if (v) return v;
  }
  return undefined;
};

export const captureTrackingParams = (): TrackingParams => {
  const urlParams = new URLSearchParams(window.location.search);

  const params: TrackingParams = {
    landing_page: window.location.href,
    gclid: urlParams.get('gclid') || undefined,
    fbclid: urlParams.get('fbclid') || undefined,
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    // Accept multiple aliases so the ads team has flexibility in URL templates.
    ad_id: pickFirst(urlParams, ['ad_id', 'ad_source_id', 'fb_ad_id']),
    adset_id: pickFirst(urlParams, ['adset_id', 'fb_adset_id']),
    campaign_id: pickFirst(urlParams, ['campaign_id', 'fb_campaign_id']),
    search_term: pickFirst(urlParams, ['search_term', 'keyword']),
  };

  localStorage.setItem('tracking_params', JSON.stringify(params));

  return params;
};

/**
 * Where the visitor first came from: the referrer's domain and the path of the
 * first page they saw. Captured once per visitor and kept for 90 days, so a lead
 * still carries it after navigating to other pages or coming back later. UTMs
 * are separate (captureTrackingParams) and keep following the current URL.
 */
export interface VisitorOrigin {
  referrer: string;
  landing_page: string;
}

const VISITOR_ORIGIN_KEY = 'visitor_origin';
const VISITOR_ORIGIN_TTL_MS = 90 * 24 * 60 * 60 * 1000;

const referrerDomain = (): string => {
  try {
    return document.referrer ? new URL(document.referrer).hostname : '';
  } catch {
    return '';
  }
};

// Call on every page load; it only writes when nothing (unexpired) is stored yet.
export const captureVisitorOrigin = (): void => {
  try {
    const stored = JSON.parse(localStorage.getItem(VISITOR_ORIGIN_KEY) || 'null');
    if (stored && stored.expires_at > Date.now()) return;
    localStorage.setItem(
      VISITOR_ORIGIN_KEY,
      JSON.stringify({
        referrer: referrerDomain(),
        landing_page: window.location.pathname,
        expires_at: Date.now() + VISITOR_ORIGIN_TTL_MS,
      }),
    );
  } catch {
    // Storage unavailable (private mode, blocked): the lead just goes without origin.
  }
};

export const getVisitorOrigin = (): VisitorOrigin => {
  try {
    const stored = JSON.parse(localStorage.getItem(VISITOR_ORIGIN_KEY) || 'null');
    if (stored) return { referrer: stored.referrer || '', landing_page: stored.landing_page || '' };
  } catch {
    // fall through
  }
  return { referrer: '', landing_page: '' };
};

export const getStoredTrackingParams = (): TrackingParams => {
  const stored = localStorage.getItem('tracking_params');
  if (stored) {
    return JSON.parse(stored);
  }
  return { landing_page: window.location.href };
};

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

export const trackFormSubmission = (formData: {
  email: string;
  phone: string;
  intent: string;
  timeline: string;
  budget_range: string;
}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 0,
      event_category: 'Form',
      event_label: 'Lead Form Submission',
      intent: formData.intent,
      timeline: formData.timeline,
      budget_range: formData.budget_range,
    });
  }
};
