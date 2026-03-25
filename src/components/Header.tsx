import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onOpenForm: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ onOpenForm, scrollToSection }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    const isSpanish = location.pathname.startsWith('/es');
    if ((isSpanish && savedLang === 'en') || (!isSpanish && savedLang === 'es')) {
      setLanguage(isSpanish ? 'es' : 'en');
      localStorage.setItem('language', isSpanish ? 'es' : 'en');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (lang: 'en' | 'es') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);

    if (lang === 'es') {
      if (location.pathname === '/thank-you') {
        navigate('/es/thank-you');
      } else {
        navigate('/es');
      }
    } else {
      if (location.pathname === '/es/thank-you') {
        navigate('/thank-you');
      } else {
        navigate('/');
      }
    }
  };

  const navLinks = language === 'es'
    ? [
        { label: 'Master Plan', id: 'masterplan' },
        { label: 'Ventajas', id: 'advantages' },
        { label: 'Amenidades', id: 'amenities' },
      ]
    : [
        { label: 'Master Plan', id: 'masterplan' },
        { label: 'Advantages', id: 'advantages' },
        { label: 'Amenities', id: 'amenities' },
      ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/logo-selvandentro_tulum.webp"
              alt="Selvadentro"
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-stone-700 hover:text-brand-olive'
                    : 'text-white hover:text-brand-copper'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side: CTA + Language Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenForm}
              className={`hidden sm:block px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                isScrolled
                  ? 'bg-brand-olive text-white hover:bg-brand-dark-green'
                  : 'bg-white text-stone-900 hover:bg-white/90'
              }`}
            >
              {language === 'es' ? 'Obtener información' : 'Get information'}
            </button>

            <div className={`flex items-center gap-1 rounded-full p-1 border ${
              isScrolled
                ? 'bg-stone-100 border-stone-200'
                : 'bg-white/10 backdrop-blur-md border-white/20'
            }`}>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  language === 'en'
                    ? isScrolled
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'bg-white text-stone-900'
                    : isScrolled
                      ? 'text-stone-700 hover:bg-white/50'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  language === 'es'
                    ? isScrolled
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'bg-white text-stone-900'
                    : isScrolled
                      ? 'text-stone-700 hover:bg-white/50'
                      : 'text-white hover:bg-white/10'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
<script src="https://t.contentsquare.net/uxa/213def49ed92d.js"></script>