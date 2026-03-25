export interface TrackingParams {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page: string;
}

export const captureTrackingParams = (): TrackingParams => {
  const urlParams = new URLSearchParams(window.location.search);

  const params: TrackingParams = {
    landing_page: window.location.href,
    gclid: urlParams.get('gclid') || undefined,
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
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
