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
