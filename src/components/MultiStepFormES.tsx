import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Home, TrendingUp, Flower, Clock, DollarSign, Check } from 'lucide-react';
import { captureTrackingParams, getStoredTrackingParams } from '../utils/tracking';
import { submitToGHL, FormData } from '../utils/webhook';

const COUNTRIES = ['Estados Unidos', 'Canadá', 'México', 'Europa', 'Otro'];
const COUNTRIES_EN = ['USA', 'Canada', 'Mexico', 'Europe', 'Other'];

interface FormState extends FormData {
  intent: string;
  timeline: string;
  budget_range: string;
}

export default function MultiStepFormES() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormState>({
    intent: '',
    timeline: '',
    budget_range: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: 'USA',
  });

  useEffect(() => {
    captureTrackingParams();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        return;
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (currentStep < totalSteps) {
          handleNext();
        } else if (currentStep === totalSteps && !isSubmitting) {
          handleSubmit();
        }
      } else if (e.key === 'Enter' && e.shiftKey && currentStep > 1) {
        e.preventDefault();
        handleBack();
      } else if (['1', '2', '3', '4'].includes(e.key) && [1, 2, 3].includes(currentStep)) {
        const options = getOptionsForStep(currentStep);
        const index = parseInt(e.key) - 1;
        if (options && index < options.length) {
          handleOptionSelect(currentStep, options[index].value);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, formData, isSubmitting]);

  const getOptionsForStep = (step: number) => {
    switch (step) {
      case 1:
        return [
          { value: 'investment', label: 'Oportunidad de inversión', icon: TrendingUp },
          { value: 'retirement', label: 'Para retiro/vivir', icon: Home },
          { value: 'cenote_wellness', label: 'Estilo de Vida Cenote & Wellness', icon: Flower },
        ];
      case 2:
        return [
          { value: 'immediately', label: 'Inmediatamente', icon: Clock },
          { value: '0-3', label: '0–3 meses', icon: Clock },
          { value: '3-6', label: '3–6 meses', icon: Clock },
          { value: '6-12', label: '6–12 meses', icon: Clock },
        ];
      case 3:
        return [
          { value: '60k-100k', label: '$60k–$100k', icon: DollarSign },
          { value: '100k-150k', label: '$100k–$150k', icon: DollarSign },
          { value: '150k-200k', label: '$150k–$200k', icon: DollarSign },
          { value: '200k-250k', label: '$200k–$250k', icon: DollarSign },
        ];
      default:
        return null;
    }
  };

  const handleOptionSelect = (step: number, value: string) => {
    switch (step) {
      case 1:
        setFormData({ ...formData, intent: value });
        break;
      case 2:
        setFormData({ ...formData, timeline: value });
        break;
      case 3:
        setFormData({ ...formData, budget_range: value });
        break;
    }
  };

  const totalSteps = 5;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.intent) newErrors.intent = 'Por favor selecciona una opción';
        break;
      case 2:
        if (!formData.timeline) newErrors.timeline = 'Por favor selecciona un plazo';
        break;
      case 3:
        if (!formData.budget_range) newErrors.budget_range = 'Por favor selecciona un rango de presupuesto';
        break;
      case 4:
        if (!formData.first_name.trim()) newErrors.first_name = 'El nombre es requerido';
        if (!formData.last_name.trim()) newErrors.last_name = 'El apellido es requerido';
        if (!formData.email.trim()) {
          newErrors.email = 'El correo electrónico es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Por favor ingresa un correo válido';
        }
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const trackingParams = getStoredTrackingParams();

    await submitToGHL({ ...formData, language: 'Spanish' }, trackingParams);

    setTimeout(() => {
      navigate('/es/thank-you');
    }, 500);
  };

  const renderStep = () => {
    const options = getOptionsForStep(currentStep);

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">¿Cuál es el propósito de tu compra?</h3>
            <div className="space-y-3">
              {options?.map((option, index) => {
                const Icon = option.icon;
                const isSelected = formData.intent === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${
                      isSelected
                        ? 'border-brand-olive bg-brand-olive/5 shadow-sm option-card-selected'
                        : 'border-stone-200 hover:border-brand-olive/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-olive' : 'bg-stone-100 group-hover:bg-brand-olive/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-stone-600 group-hover:text-brand-olive'}`} />
                      </div>
                      <div>
                        <span className="text-stone-800 font-medium">{option.label}</span>
                        <span className="block text-xs text-stone-500 mt-0.5">Presiona {index + 1}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="intent"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-brand-olive bg-brand-olive' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.intent && <p className="text-sm text-red-600">{errors.intent}</p>}
          </div>
        );

      case 2:
        return (
          <div className="space-y-5 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">¿Cuándo planeas comprar?</h3>
            <div className="space-y-3">
              {options?.map((option, index) => {
                const Icon = option.icon;
                const isSelected = formData.timeline === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${
                      isSelected
                        ? 'border-brand-olive bg-brand-olive/5 shadow-sm option-card-selected'
                        : 'border-stone-200 hover:border-brand-olive/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-olive' : 'bg-stone-100 group-hover:bg-brand-olive/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-stone-600 group-hover:text-brand-olive'}`} />
                      </div>
                      <div>
                        <span className="text-stone-800 font-medium">{option.label}</span>
                        <span className="block text-xs text-stone-500 mt-0.5">Presiona {index + 1}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="timeline"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-brand-olive bg-brand-olive' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.timeline && <p className="text-sm text-red-600">{errors.timeline}</p>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-5 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Rango de presupuesto (USD)</h3>
            <div className="space-y-3">
              {options?.map((option, index) => {
                const Icon = option.icon;
                const isSelected = formData.budget_range === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 group ${
                      isSelected
                        ? 'border-brand-olive bg-brand-olive/5 shadow-sm option-card-selected'
                        : 'border-stone-200 hover:border-brand-olive/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-olive' : 'bg-stone-100 group-hover:bg-brand-olive/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-stone-600 group-hover:text-brand-olive'}`} />
                      </div>
                      <div>
                        <span className="text-stone-800 font-medium">{option.label}</span>
                        <span className="block text-xs text-stone-500 mt-0.5">Presiona {index + 1}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="budget_range"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-brand-olive bg-brand-olive' : 'border-stone-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.budget_range && <p className="text-sm text-red-600">{errors.budget_range}</p>}
          </div>
        );

      case 4:
        return (
          <div className="space-y-5 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Tu información de contacto</h3>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.first_name ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="Ingresa tu nombre"
              />
              {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.last_name ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="Ingresa tu apellido"
              />
              {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.email ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="tu@correo.com"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.phone ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="+52 (555) 000-0000"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">País</label>
              <select
                value={formData.country}
                onChange={(e) => {
                  const index = COUNTRIES.indexOf(e.target.value);
                  const enValue = index >= 0 ? COUNTRIES_EN[index] : 'Other';
                  setFormData({ ...formData, country: enValue });
                }}
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive"
              >
                {COUNTRIES.map((country, index) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Revisa tu información</h3>
            <div className="space-y-4 bg-stone-50 p-6 rounded-lg">
              <ReviewItem label="Propósito" value={getLabelForValue('intent', formData.intent)} />
              <ReviewItem label="Plazo" value={getLabelForValue('timeline', formData.timeline)} />
              <ReviewItem label="Presupuesto" value={getLabelForValue('budget', formData.budget_range)} />
              <ReviewItem label="Nombre" value={`${formData.first_name} ${formData.last_name}`} />
              <ReviewItem label="Correo" value={formData.email} />
              <ReviewItem label="Teléfono" value={formData.phone} />
              <ReviewItem label="País" value={getCountryLabel(formData.country)} />
            </div>
            <p className="text-sm text-stone-600">
              Al enviar, recibirás los detalles de precios y opciones de pago para Selvadentro.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getLabelForValue = (type: string, value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      intent: {
        investment: 'Oportunidad de inversión',
        retirement: 'Para retiro/vivir',
        cenote_wellness: 'Estilo de Vida Cenote & Wellness',
      },
      timeline: {
        immediately: 'Inmediatamente',
        '0-3': '0–3 meses',
        '3-6': '3–6 meses',
        '6-12': '6–12 meses',
      },
      budget: {
        '60k-100k': '$60k–$100k',
        '100k-150k': '$100k–$150k',
        '150k-200k': '$150k–$200k',
        '200k-250k': '$200k–$250k',
      },
    };
    return labels[type]?.[value] || value;
  };

  const getCountryLabel = (country: string): string => {
    const index = COUNTRIES_EN.indexOf(country);
    return index >= 0 ? COUNTRIES[index] : country;
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="mb-6 md:mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-stone-700">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1 bg-stone-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-olive to-brand-dark-green transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[300px] sm:min-h-[400px] mb-6 md:mb-8">{renderStep()}</div>

      <div className="flex flex-col sm:flex-row gap-3">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
            disabled={isSubmitting}
          >
            <ChevronLeft className="w-4 h-4" />
            Atrás
          </button>
        )}

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-olive text-white rounded-lg hover:bg-brand-dark-green transition-colors"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-olive text-white rounded-lg hover:bg-brand-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Obtener Precios y Plan de Pago'
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start border-b border-stone-200 pb-3 last:border-0 last:pb-0">
      <span className="text-sm font-medium text-stone-500">{label}</span>
      <span className="text-sm text-stone-800 text-right">{value}</span>
    </div>
  );
}
