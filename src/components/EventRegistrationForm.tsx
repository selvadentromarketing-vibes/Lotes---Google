import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import { BUDGET_OPTIONS_USD, type BudgetOption } from '../utils/squeezeWebhook';
import {
  submitEventRegistration,
  OWNING_TULUM_SOURCE_LABEL,
  VISITED_TULUM_OPTIONS,
  type VisitedTulumOption,
} from '../utils/eventWebhook';
import { captureTrackingParams } from '../utils/tracking';
import { newLeadEventId, trackMetaLead } from '../utils/leadConversion';
import { SQUEEZE_LAYOUT_T } from '../config/squeezeContent';
import { OWNING_TULUM_EVENT } from '../config/owningTulumContent';

// Field labels, placeholders and consent copy are shared with the English squeeze form.
const t = SQUEEZE_LAYOUT_T.en;

const inputClass =
  'w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition';
const selectClass =
  'w-full px-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10';
const selectChevron = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23737373'><path fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/></svg>\")",
};

function FieldLabel({ children }: { children: string }) {
  return (
    <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
      {children} <span className="text-brand-copper">*</span>
    </span>
  );
}

export default function EventRegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState<BudgetOption | ''>('');
  const [visited, setVisited] = useState<VisitedTulumOption | ''>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim() || !lastName.trim() || !phone || !email.trim() || !budget || !visited) {
      setErrorMessage(t.errorMissing);
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setErrorMessage(t.errorPhone);
      return;
    }

    setStatus('submitting');
    const result = await submitEventRegistration(
      {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone,
        budget,
        visited_tulum: visited,
      },
      captureTrackingParams(),
    );

    if (result.success) {
      // Meta Lead once per submission, as on the squeeze form — but no Google Ads
      // conversion: event registrations must not count as lot leads there.
      trackMetaLead(newLeadEventId(), {
        content_name: 'owning-tulum',
        content_category: 'event-registration',
      });
      window.gtag?.('event', 'generate_lead', {
        event_category: 'Event',
        event_label: `${OWNING_TULUM_SOURCE_LABEL}-registration`,
        currency: 'USD',
        value: 0,
      });
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(
        `We couldn’t save your registration. Please try again or write to ${OWNING_TULUM_EVENT.contactEmail}.`,
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-2xl text-center" role="status">
        <CheckCircle2 className="w-12 h-12 text-brand-olive mx-auto mb-4" />
        <h3 className="font-cardo text-2xl font-bold text-brand-dark-green mb-2">Your seat is reserved</h3>
        <p className="text-stone-700 leading-relaxed">
          Thank you, {firstName.trim()}. We look forward to seeing you on {OWNING_TULUM_EVENT.dateLabel} at{' '}
          {OWNING_TULUM_EVENT.venueName}.
        </p>
        <p className="mt-4 text-sm text-stone-500">
          Questions?{' '}
          <a href={`mailto:${OWNING_TULUM_EVENT.contactEmail}`} className="underline hover:text-brand-dark-green">
            {OWNING_TULUM_EVENT.contactEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
      noValidate
    >
      <h3 className="font-cardo text-2xl sm:text-3xl font-bold text-brand-dark-green mb-1 leading-tight">
        Reserve your seat
      </h3>
      <p className="text-sm text-stone-600 mb-5">Free entry · Seating is limited.</p>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <FieldLabel>{t.fieldFirstName}</FieldLabel>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
              placeholder={t.placeholderFirstName}
              autoComplete="given-name"
              required
            />
          </label>
          <label className="block">
            <FieldLabel>{t.fieldLastName}</FieldLabel>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
              placeholder={t.placeholderLastName}
              autoComplete="family-name"
              required
            />
          </label>
        </div>

        <label className="block">
          <FieldLabel>{t.fieldEmail}</FieldLabel>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={t.placeholderEmail}
            autoComplete="email"
            required
          />
        </label>

        <label className="block">
          <FieldLabel>{t.fieldPhone}</FieldLabel>
          <div className="phone-input-shell px-4 py-3 border border-stone-300 rounded-lg bg-white transition focus-within:border-brand-olive focus-within:ring-2 focus-within:ring-brand-olive/30">
            <PhoneInput
              defaultCountry="CA"
              value={phone}
              onChange={setPhone}
              placeholder="416 555 0123"
              autoComplete="tel"
              numberInputProps={{ 'aria-label': t.fieldPhone, required: true }}
            />
          </div>
        </label>

        <label className="block">
          <FieldLabel>{t.fieldBudget}</FieldLabel>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value as BudgetOption | '')}
            className={selectClass}
            style={selectChevron}
            required
          >
            <option value="" disabled>{t.placeholderBudget}</option>
            {BUDGET_OPTIONS_USD.map((opt) => (
              <option key={opt} value={opt}>{opt} USD</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Have you visited Tulum? <span className="text-brand-copper">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {VISITED_TULUM_OPTIONS.map((opt) => (
              <label
                key={opt}
                className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition text-sm ${
                  visited === opt
                    ? 'border-brand-olive bg-brand-olive/10 text-brand-dark-green font-semibold'
                    : 'border-stone-300 text-stone-700 hover:border-brand-olive/60'
                }`}
              >
                <input
                  type="radio"
                  name="visited_tulum"
                  value={opt}
                  checked={visited === opt}
                  onChange={() => setVisited(opt)}
                  className="accent-brand-olive"
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
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
          'Reserve your seat'
        )}
      </button>

      <p className="mt-3 text-[11px] text-stone-500 text-center leading-relaxed">
        {t.consentPrivacy}{' '}
        <a
          href="https://selvadentrotulum.com/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand-dark-green transition-colors"
        >
          {t.privacyPolicy}
        </a>
      </p>
    </form>
  );
}
