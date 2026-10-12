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

/**
 * Ad attribution: the utm_* params plus the gclid/fbclid click IDs, kept as one
 * block. A URL carrying any of them replaces the whole block, so one visit's
 * utm_source is never mixed with another visit's utm_campaign. A URL without
 * them keeps the stored block, so it survives navigation. The block expires 30
 * days after it was saved: ad spend is decided on short windows.
 */
const AD_ATTRIBUTION_KEY = 'ad_attribution';
const AD_ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const AD_ATTRIBUTION_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid',
] as const;
type AdAttribution = Partial<Record<(typeof AD_ATTRIBUTION_PARAMS)[number], string>>;

const currentAdAttribution = (urlParams: URLSearchParams): AdAttribution => {
  const fromUrl: AdAttribution = {};
  AD_ATTRIBUTION_PARAMS.forEach((k) => {
    const v = urlParams.get(k);
    if (v) fromUrl[k] = v;
  });
  try {
    if (Object.keys(fromUrl).length) {
      localStorage.setItem(AD_ATTRIBUTION_KEY, JSON.stringify({ params: fromUrl, saved_at: Date.now() }));
      return fromUrl;
    }
    const stored = JSON.parse(localStorage.getItem(AD_ATTRIBUTION_KEY) || 'null');
    if (stored && Date.now() - stored.saved_at <= AD_ATTRIBUTION_TTL_MS) return stored.params || {};
    localStorage.removeItem(AD_ATTRIBUTION_KEY);
  } catch {
    // Storage unavailable: only what the current URL carries.
  }
  return fromUrl;
};

// Call on every page load, so the block is saved on arrival even if the form opens on another page.
export const captureAdAttribution = (): void => {
  currentAdAttribution(new URLSearchParams(window.location.search));
};

export const captureTrackingParams = (): TrackingParams => {
  const urlParams = new URLSearchParams(window.location.search);

  const params: TrackingParams = {
    landing_page: window.location.href,
    ...currentAdAttribution(urlParams),
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
 * and click IDs are tracked separately (see currentAdAttribution).
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
