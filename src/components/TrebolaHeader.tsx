import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TrebolaHeaderProps {
  onOpenForm: () => void;
  translations: any;
}

export default function TrebolaHeader({ onOpenForm, translations }: TrebolaHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsScrolled(window.scrollY > 20);
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#ECE5D8] shadow-md' : 'bg-[#ECE5D8]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <img
              src="/logo-selvandentro_tulum.webp"
              alt="Selvadentro"
              className="h-16 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('masterplan')}
              className="text-sm font-medium text-brand-dark-green hover:text-brand-olive transition-colors"
            >
              {translations.header.masterplan}
            </button>
            <button
              onClick={() => scrollToSection('advantages')}
              className="text-sm font-medium text-brand-dark-green hover:text-brand-olive transition-colors"
            >
              {translations.header.advantages}
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className="text-sm font-medium text-brand-dark-green hover:text-brand-olive transition-colors"
            >
              {translations.header.amenities}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenForm}
              className="hidden sm:block px-6 py-2.5 bg-brand-olive text-white rounded-full font-medium text-sm hover:bg-brand-dark-green transition-all shadow-sm"
            >
              {translations.header.ctaButton}
            </button>

            <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-stone-200">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-brand-olive text-white'
                    : 'text-brand-dark-green/80 hover:bg-stone-50'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('es')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  language === 'es'
                    ? 'bg-brand-olive text-white'
                    : 'text-brand-dark-green/80 hover:bg-stone-50'
                }`}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-dark-green hover:text-brand-olive transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] bg-[#ECE5D8] z-40 overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('masterplan')}
              className="block w-full text-left px-4 py-3 text-base font-medium text-brand-dark-green hover:bg-white hover:text-brand-olive rounded-lg transition-colors"
            >
              {translations.header.masterplan}
            </button>
            <button
              onClick={() => scrollToSection('advantages')}
              className="block w-full text-left px-4 py-3 text-base font-medium text-brand-dark-green hover:bg-white hover:text-brand-olive rounded-lg transition-colors"
            >
              {translations.header.advantages}
            </button>
            <button
              onClick={() => scrollToSection('amenities')}
              className="block w-full text-left px-4 py-3 text-base font-medium text-brand-dark-green hover:bg-white hover:text-brand-olive rounded-lg transition-colors"
            >
              {translations.header.amenities}
            </button>
            <button
              onClick={() => {
                onOpenForm();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-6 py-3 bg-brand-olive text-white rounded-full font-medium text-base hover:bg-brand-dark-green transition-all shadow-sm text-center"
            >
              {translations.header.ctaButton}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
<script src="https://t.contentsquare.net/uxa/213def49ed92d.js"></script>