import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, MessageSquare, Home } from 'lucide-react';

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-16717627054/4jnsCKrQ3dQbEK79yqM-',
      });
    }
    // Meta Pixel Lead event — pixel base is installed in index.html.
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hi! I requested lots + pricing + payment plan. Can you share availability and next steps?"
  );
  const smsMessage = encodeURIComponent(
    "Hi, I'd like to learn more about Selvadentro Tulum"
  );

  return (
    <div className="min-h-screen bg-[#ECE5D8] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-olive/10 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-olive" />
          </div>

          <h1 className="font-cardo text-3xl sm:text-4xl font-bold text-brand-dark-green mb-4">
            Request received
          </h1>

          <p className="text-lg text-stone-600 mb-8">
            A Selvadentro advisor will contact you shortly with availability, pricing, and payment plan options.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <a
              href={`https://wa.me/5219994890828?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-brand-olive text-white rounded-full hover:bg-brand-dark-green transition-all font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Message on WhatsApp</span>
            </a>

            <a
              href={`sms:+12108791979?body=${smsMessage}`}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-brand-copper text-white rounded-full hover:bg-brand-copper/90 transition-all font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="sm:hidden">SMS</span>
              <span className="hidden sm:inline">Send us an SMS</span>
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
              Back to Selvadentro
            </a>
          </div>

          <div className="pt-8 border-t border-stone-200">
            <h2 className="font-cardo text-xl font-bold text-brand-dark-green mb-6">What happens next?</h2>
            <div className="space-y-4 text-left max-w-lg mx-auto">
              {[
                "A Selvadentro advisor will review availability that matches your preferences.",
                "We'll contact you by WhatsApp, phone, or email with pricing + payment plan options.",
                "If you'd like, we'll schedule a site visit or video tour.",
                "If you decide to move forward, we'll guide you through reserving a lot.",
              ].map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-olive/10 text-brand-olive rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-stone-600 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500 mt-6">
              No spam — just the information you requested.
            </p>
          </div>
        </div>

        <p className="text-center text-stone-500 text-sm mt-8">
          Questions? Contact us at{' '}
          <a href="mailto:Mkt@selvadentrotulum.com" className="text-brand-olive hover:underline">
            Mkt@selvadentrotulum.com
          </a>
        </p>
      </div>
    </div>
  );
}
