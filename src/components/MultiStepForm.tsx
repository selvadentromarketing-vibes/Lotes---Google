import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Home, TrendingUp, Flower, Clock, DollarSign, Check } from 'lucide-react';
import { captureTrackingParams, getStoredTrackingParams } from '../utils/tracking';
import { submitToGHL, FormData } from '../utils/webhook';

const COUNTRIES = ['USA', 'Canada', 'Mexico', 'Europe', 'Other'];

interface FormState extends FormData {
  intent: string;
  timeline: string;
  budget_range: string;
}

export default function MultiStepForm() {
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
          { value: 'investment', label: 'Investment opportunity', icon: TrendingUp },
          { value: 'retirement', label: 'For retirement/living', icon: Home },
          { value: 'cenote_wellness', label: 'Cenote & Wellness Lifestyle', icon: Flower },
        ];
      case 2:
        return [
          { value: 'immediately', label: 'Immediately', icon: Clock },
          { value: '0-3', label: '0–3 months', icon: Clock },
          { value: '3-6', label: '3–6 months', icon: Clock },
          { value: '6-12', label: '6–12 months', icon: Clock },
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
        if (!formData.intent) newErrors.intent = 'Please select an option';
        break;
      case 2:
        if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
        break;
      case 3:
        if (!formData.budget_range) newErrors.budget_range = 'Please select a budget range';
        break;
      case 4:
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
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

    await submitToGHL({ ...formData, language: 'English' }, trackingParams);

    setTimeout(() => {
      navigate('/thank-you');
    }, 500);
  };

  const renderStep = () => {
    const options = getOptionsForStep(currentStep);

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5 step-transition-enter">
            <h3 className="editorial-serif-medium text-2xl text-stone-800">What is the purpose of your purchase?</h3>
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
                        <span className="block text-xs text-stone-500 mt-0.5">Press {index + 1}</span>
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
            <h3 className="editorial-serif-medium text-2xl text-stone-800">When are you planning to buy?</h3>
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
                        <span className="block text-xs text-stone-500 mt-0.5">Press {index + 1}</span>
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
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Budget range (USD)</h3>
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
                        <span className="block text-xs text-stone-500 mt-0.5">Press {index + 1}</span>
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
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Your contact information</h3>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.first_name ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="Enter your first name"
              />
              {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.last_name ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="Enter your last name"
              />
              {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.email ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive ${
                  errors.phone ? 'border-red-500' : 'border-stone-200'
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-olive"
              >
                {COUNTRIES.map((country) => (
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
            <h3 className="editorial-serif-medium text-2xl text-stone-800">Review your information</h3>
            <div className="space-y-4 bg-stone-50 p-6 rounded-lg">
              <ReviewItem label="Purpose" value={getLabelForValue('intent', formData.intent)} />
              <ReviewItem label="Timeline" value={getLabelForValue('timeline', formData.timeline)} />
              <ReviewItem label="Budget" value={getLabelForValue('budget', formData.budget_range)} />
              <ReviewItem label="Name" value={`${formData.first_name} ${formData.last_name}`} />
              <ReviewItem label="Email" value={formData.email} />
              <ReviewItem label="Phone" value={formData.phone} />
              <ReviewItem label="Country" value={formData.country} />
            </div>
            <p className="text-sm text-stone-600">
              By submitting, you'll receive pricing details and payment options for Selvadentro.
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
        investment: 'Investment opportunity',
        retirement: 'For retirement/living',
        cenote_wellness: 'Cenote & Wellness Lifestyle',
      },
      timeline: {
        immediately: 'Immediately',
        '0-3': '0–3 months',
        '3-6': '3–6 months',
        '6-12': '6–12 months',
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

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="mb-6 md:mb-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-stone-700">
            Step {currentStep} of {totalSteps}
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
            Back
          </button>
        )}

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-olive text-white rounded-lg hover:bg-brand-dark-green transition-colors"
          >
            Next
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
                Submitting...
              </>
            ) : (
              'Get Pricing & Payment Plan'
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
