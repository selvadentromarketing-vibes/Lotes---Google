// Pricing configuration - edit these values to update prices across the site
export const STARTING_PRICE_USD = 68000;
export const STARTING_PRICE_MXN = 1360000; // TODO: set exact MXN starting price before launch

// Format price with commas
export const formatPrice = (price: number, currency: 'USD' | 'MXN'): string => {
  return `$${price.toLocaleString('en-US')} ${currency}`;
};

// Pricing footnotes
export const PRICING_FOOTNOTE = {
  en: '*Starting price subject to availability. Taxes/closing costs not included.',
  es: '*Precio desde sujeto a disponibilidad. Impuestos/costos de cierre no incluidos.',
};
