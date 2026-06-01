import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Home } from 'lucide-react';

/**
 * Per-angle thank-you page for the squeeze landings.
 *
 * Routes (one per angle):
 *   /gracias/escape
 *   /gracias/oportunidad-perdida
 *   /gracias/accesibilidad
 *   /gracias/seguridad
 *
 * Each URL is distinct so Meta Ads + Google Ads can fire conversion pixels
 * per-angle automatically (Meta tracks PageView by URL; Google Ads conversion
 * actions can be filtered by URL contains "/gracias/<angle>").
 *
 * For Google Ads conversion firing, we keep the same conversion ID as the
 * existing /es/thank-you but include the angle as an event parameter so the
 * conversion can be segmented in Google Ads reports.
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
    // gtag is already declared in src/utils/tracking.ts — don't redeclare.
    // fbq elsewhere uses unknown[], so match to avoid type-merge conflict.
    fbq?: (...args: unknown[]) => void;
  }
}

export default function SqueezeThankYou() {
  const { angle = '' } = useParams<{ angle: string }>();
  const safeAngle = VALID_ANGLES.has(angle) ? angle : 'unknown';
  const angleLabel = ANGLE_LABEL[safeAngle] ?? 'Squeeze';

  useEffect(() => {
    document.title = `Solicitud recibida — ${angleLabel} | Selvadentro Tulum`;

    // Google Ads conversion — same ID as /es/thank-you, with the angle
    // surfaced as event_label so reports can split by angle.
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

    // Meta Pixel — Lead + custom event so Meta can attribute by angle.
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: `squeeze-${safeAngle}`,
        content_category: 'squeeze-thankyou',
      });
      window.fbq('trackCustom', `SqueezeThankYou_${safeAngle}`, {
        angle: safeAngle,
      });
    }
  }, [safeAngle, angleLabel]);

  const whatsappMessage = encodeURIComponent(
    '¡Hola! Solicité información sobre Selvadentro. ¿Me compartes disponibilidad y precios de Fase 1?',
  );

  return (
    <div className="min-h-screen bg-[#ECE5D8] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-olive/10 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-olive" />
          </div>

          <h1 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
            Solicitud recibida
          </h1>

          <p className="text-lg text-stone-600 mb-8">
            Un asesor de Selvadentro se pondrá en contacto contigo en menos de 24 horas con disponibilidad, precios y opciones de plan de pago.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={`https://wa.me/5219841374927?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar mensaje por WhatsApp
            </a>

            <a
              href="https://selvadentrotulum.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-dark-green/20 text-brand-dark-green rounded-full hover:bg-brand-dark-green/5 transition-all font-medium"
            >
              <Home className="w-5 h-5" />
              Conocer Selvadentro
            </a>
          </div>

          <div className="pt-8 border-t border-stone-200">
            <h2 className="font-cardo text-xl font-bold text-brand-dark-green mb-6">
              ¿Qué sigue?
            </h2>
            <ol className="space-y-4 text-left max-w-lg mx-auto">
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand-copper/15 text-brand-copper inline-flex items-center justify-center font-cardo font-bold text-sm">
                  1
                </span>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Un asesor revisará disponibilidad de lotes según tus preferencias.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand-copper/15 text-brand-copper inline-flex items-center justify-center font-cardo font-bold text-sm">
                  2
                </span>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Te contactaremos por WhatsApp o llamada en menos de 24 horas.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-brand-copper/15 text-brand-copper inline-flex items-center justify-center font-cardo font-bold text-sm">
                  3
                </span>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Si quieres adelantar, escríbenos directamente al WhatsApp arriba.
                </p>
              </li>
            </ol>
          </div>

          <div className="pt-8 mt-8 border-t border-stone-200 text-xs text-stone-400">
            <Link to="/" className="hover:text-brand-olive transition">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
