import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, MessageSquare, Home } from 'lucide-react';
import { SQUEEZE_LAYOUT_T, type SqueezeLang } from '../config/squeezeContent';

/**
 * Per-angle thank-you page for the squeeze landings — bilingual.
 *
 * Routes (one per angle, two languages):
 *   /gracias/<angle>           (Spanish — default; matches legacy Meta ad URLs)
 *   /en/gracias/<angle>        (English)
 *
 * Each URL is distinct so Meta Ads + Google Ads can fire conversion pixels
 * per-angle automatically.
 */

const VALID_ANGLES = new Set([
  'escape',
  'oportunidad-perdida',
  'accesibilidad',
  'seguridad',
]);

const ANGLE_LABEL: Record<string, string> = {
  escape: 'Escape',
  'oportunidad-perdida': 'Oportunidad Perdida',
  accesibilidad: 'Accesibilidad',
  seguridad: 'Seguridad',
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface Props {
  lang?: SqueezeLang;
}

export default function SqueezeThankYou({ lang = 'es' }: Props) {
  const { angle = '' } = useParams<{ angle: string }>();
  const safeAngle = VALID_ANGLES.has(angle) ? angle : 'unknown';
  const angleLabel = ANGLE_LABEL[safeAngle] ?? 'Squeeze';
  const t = SQUEEZE_LAYOUT_T[lang];

  useEffect(() => {
    document.title = `${t.thankYouDocTitle} — ${angleLabel} | Selvadentro Tulum`;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16717627054/4jnsCKrQ3dQbEK79yqM-',
        event_label: `squeeze-${safeAngle}`,
        squeeze_angle: safeAngle,
      });
      window.gtag('event', 'generate_lead', {
        event_category: 'Squeeze',
        event_label: `squeeze-${safeAngle}-thankyou`,
        currency: 'USD',
        value: 0,
      });
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: `squeeze-${safeAngle}`,
        content_category: 'squeeze-thankyou',
      });
      window.fbq('trackCustom', `SqueezeThankYou_${safeAngle}`, {
        angle: safeAngle,
      });
    }
  }, [safeAngle, angleLabel, t]);

  const whatsappMessage = encodeURIComponent(t.thankYouWhatsappMessage);
  const smsMessage = encodeURIComponent(t.thankYouSmsMessage);
  const homeLink = lang === 'en' ? '/en' : '/';

  return (
    <div className="min-h-screen bg-[#ECE5D8] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-olive/10 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-olive" />
          </div>

          <h1 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">{t.thankYouTitle}</h1>
          <p className="text-lg text-stone-600 mb-8">{t.thankYouBody}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <a
              href={`https://wa.me/5219994890828?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="sm:hidden">{t.thankYouWhatsappShort}</span>
              <span className="hidden sm:inline">{t.thankYouWhatsappLong}</span>
            </a>

            <a
              href={`sms:+12108791979?body=${smsMessage}`}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-brand-copper text-white rounded-full hover:bg-brand-copper/90 transition-all font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="sm:hidden">{t.thankYouSmsShort}</span>
              <span className="hidden sm:inline">{t.thankYouSmsLong}</span>
            </a>
          </div>

          <div className="flex justify-center mb-12">
            <a
              href="https://selvadentrotulum.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-brand-dark-green/20 text-brand-dark-green rounded-full hover:bg-brand-dark-green/5 transition-all font-medium text-sm"
            >
              <Home className="w-4 h-4" />
              {t.thankYouHomeCta}
            </a>
          </div>

          <div className="pt-8 border-t border-stone-200">
            <h2 className="font-cardo text-xl font-bold text-brand-dark-green mb-6">{t.thankYouNextTitle}</h2>
            <ol className="space-y-4 text-left max-w-lg mx-auto">
              {[t.thankYouNext1, t.thankYouNext2, t.thankYouNext3].map((body, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-copper/15 text-brand-copper inline-flex items-center justify-center font-cardo font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-8 mt-8 border-t border-stone-200 text-xs text-stone-400">
            <Link to={homeLink} className="hover:text-brand-olive transition">{t.thankYouBack}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
