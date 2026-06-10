import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import {
  SqueezeAngle,
  submitSqueezeLead,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type BudgetOption,
  type TimelineOption,
} from '../utils/squeezeWebhook';
import { captureTrackingParams } from '../utils/tracking';
import { SQUEEZE_LAYOUT_T, type SqueezeLang } from '../config/squeezeContent';

interface SqueezeFormProps {
  angle: SqueezeAngle;
  ctaLabel: string;
  lang?: SqueezeLang;
}

const splitName = (full: string): { first: string; last: string } => {
  const trimmed = full.trim().replace(/\s+/g, ' ');
  if (!trimmed) return { first: '', last: '' };
  const parts = trimmed.split(' ');
  if (parts.length === 1) return { first: parts[0], last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
};

export default function SqueezeForm({ angle, ctaLabel, lang = 'es' }: SqueezeFormProps) {
  const t = SQUEEZE_LAYOUT_T[lang];
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState<BudgetOption | ''>('');
  const [timeline, setTimeline] = useState<TimelineOption | ''>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone || !email.trim() || !budget || !timeline) {
      setErrorMessage(t.errorMissing);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMessage(t.errorPhone);
      return;
    }

    setStatus('submitting');
    const { first, last } = splitName(fullName);
    const tracking = captureTrackingParams();

    const result = await submitSqueezeLead(
      angle,
      { first_name: first, last_name: last, email: email.trim(), phone, budget, timeline },
      tracking,
      lang, // 'es' | 'en' → GHL maps to Español / Inglés
    );

    if (result.success) {
      setStatus('success');
      // Per-angle thank-you URL. Spanish stays at /gracias/<angle>;
      // English at /en/gracias/<angle>.
      setTimeout(() => {
        const prefix = lang === 'en' ? '/en' : '';
        window.location.href = `${prefix}/gracias/${angle}`;
      }, 800);
    } else {
      setStatus('error');
      setErrorMessage(t.errorSubmit);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-olive mx-auto mb-4" />
        <h3 className="font-cardo text-2xl font-bold text-brand-dark-green mb-2">{t.successTitle}</h3>
        <p className="text-stone-700">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl"
      noValidate
    >
      <h3 className="font-cardo text-2xl sm:text-3xl font-bold text-brand-dark-green mb-1 leading-tight">{t.formTitle}</h3>
      <p className="text-sm text-stone-600 mb-5">{t.formSubtitle}</p>

      <div className="space-y-3">
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            {t.fieldName} <span className="text-brand-copper">*</span>
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition"
            placeholder={t.placeholderName}
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            {t.fieldPhone} <span className="text-brand-copper">*</span>
          </span>
          <div className="phone-input-shell px-4 py-3 border border-stone-300 rounded-lg bg-white transition focus-within:border-brand-olive focus-within:ring-2 focus-within:ring-brand-olive/30">
            <PhoneInput
              international
              defaultCountry="MX"
              countryCallingCodeEditable={false}
              value={phone}
              onChange={setPhone}
              placeholder={t.placeholderPhone}
              autoComplete="tel"
              numberInputProps={{ 'aria-label': t.fieldPhone, required: true }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            {t.fieldEmail} <span className="text-brand-copper">*</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition"
            placeholder={t.placeholderEmail}
            autoComplete="email"
            required
          />
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            {t.fieldBudget} <span className="text-brand-copper">*</span>
          </span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as BudgetOption | '')}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23737373'><path fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/></svg>\")",
            }}
            required
          >
            <option value="" disabled>{t.placeholderBudget}</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            {t.fieldTimeline} <span className="text-brand-copper">*</span>
          </span>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value as TimelineOption | '')}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23737373'><path fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/></svg>\")",
            }}
            required
          >
            <option value="" disabled>{t.placeholderTimeline}</option>
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'Immediately' ? t.timelineImmediately : opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600" role="alert">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 w-full px-6 py-4 bg-brand-olive text-white rounded-full font-semibold text-base hover:bg-brand-dark-green transition-all shadow-lg hover:shadow-brand-dark-green/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.submitting}
          </>
        ) : (
          ctaLabel
        )}
      </button>

      <p className="mt-3 text-[11px] text-stone-500 text-center leading-relaxed">{t.consent}</p>
    </form>
  );
}
