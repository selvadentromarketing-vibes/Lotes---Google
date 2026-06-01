import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import type { Value as PhoneValue } from 'react-phone-number-input';
import {
  SqueezeAngle,
  submitSqueezeLead,
} from '../utils/squeezeWebhook';
import { captureTrackingParams } from '../utils/tracking';

interface SqueezeFormProps {
  angle: SqueezeAngle;
  ctaLabel: string;
}

const splitName = (full: string): { first: string; last: string } => {
  const trimmed = full.trim().replace(/\s+/g, ' ');
  if (!trimmed) return { first: '', last: '' };
  const parts = trimmed.split(' ');
  if (parts.length === 1) return { first: parts[0], last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
};

export default function SqueezeForm({ angle, ctaLabel }: SqueezeFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState<PhoneValue | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone || !email.trim()) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    // libphonenumber-backed validation via react-phone-number-input
    if (!isValidPhoneNumber(phone)) {
      setErrorMessage('Por favor ingresa un teléfono válido (incluye lada).');
      return;
    }

    setStatus('submitting');

    const { first, last } = splitName(fullName);
    const tracking = captureTrackingParams();

    const result = await submitSqueezeLead(
      angle,
      {
        first_name: first,
        last_name: last,
        email: email.trim(),
        phone, // E.164 format from react-phone-number-input, e.g. +5219841374927
      },
      tracking,
    );

    if (result.success) {
      setStatus('success');
      // Per-angle thank-you URL so Meta + Google Ads can fire conversion pixels
      // distinct per angle (e.g., /gracias/escape vs /gracias/oportunidad-perdida).
      setTimeout(() => {
        window.location.href = `/gracias/${angle}`;
      }, 800);
    } else {
      setStatus('error');
      setErrorMessage(
        'No pudimos enviar tu solicitud. Por favor intenta de nuevo o llámanos al +52 984 137 4927.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-olive mx-auto mb-4" />
        <h3 className="font-cardo text-2xl font-bold text-brand-dark-green mb-2">
          ¡Listo!
        </h3>
        <p className="text-stone-700">
          Tu solicitud se envió. Un asesor te contactará en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl"
      noValidate
    >
      <h3 className="font-cardo text-2xl sm:text-3xl font-bold text-brand-dark-green mb-1 leading-tight">
        Ver disponibilidad
      </h3>
      <p className="text-sm text-stone-600 mb-5">
        Te llamamos en menos de 24 horas con precios y plan de pagos.
      </p>

      <div className="space-y-3">
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Nombre completo
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition"
            placeholder="Tu nombre"
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Teléfono <span className="text-brand-copper">*</span>
          </span>
          <div className="phone-input-shell px-4 py-3 border border-stone-300 rounded-lg bg-white transition focus-within:border-brand-olive focus-within:ring-2 focus-within:ring-brand-olive/30">
            <PhoneInput
              international
              defaultCountry="MX"
              countryCallingCodeEditable={false}
              value={phone}
              onChange={setPhone}
              placeholder="984 137 4927"
              autoComplete="tel"
              numberInputProps={{ 'aria-label': 'Teléfono', required: true }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive/40 focus:border-brand-olive transition"
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 w-full px-6 py-4 bg-brand-olive text-white rounded-full font-semibold text-base hover:bg-brand-dark-green transition-all shadow-lg hover:shadow-brand-dark-green/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          ctaLabel
        )}
      </button>

      <p className="mt-3 text-[11px] text-stone-500 text-center leading-relaxed">
        Al enviar aceptas que un asesor de Selvadentro te contacte.
        No compartimos tus datos.
      </p>
    </form>
  );
}
