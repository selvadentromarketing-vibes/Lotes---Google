import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TrebolaLandingPage from './pages/TrebolaLandingPage';
import ThankYouPage from './pages/ThankYouPage';
import TrebolaLandingPageES from './pages/TrebolaLandingPageES';
import ThankYouPageES from './pages/ThankYouPageES';
import LandingPage2 from './pages/LandingPage2';
import LandingPage2ES from './pages/LandingPage2ES';
// Squeeze landings — Meta Ads variants, one per emotional angle (PDF §2.5).
// New GHL webhook + standalone layout; existing routes above are UNTOUCHED.
import SqueezeEscape from './pages/SqueezeEscape';
import SqueezeOportunidadPerdida from './pages/SqueezeOportunidadPerdida';
import SqueezeAccesibilidad from './pages/SqueezeAccesibilidad';
import SqueezeSeguridad from './pages/SqueezeSeguridad';
import SqueezePremium from './pages/SqueezePremium';
import SqueezeThankYou from './pages/SqueezeThankYou';

// Fire Meta Pixel PageView on SPA route changes.
// Initial page load already fires PageView from the script in index.html;
// the ref skips the first run so we don't double-fire.
function MetaPixelRouteTracker() {
  const location = useLocation();
  const isInitial = useRef(true);
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    const w = window as Window & { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'PageView');
    }
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <MetaPixelRouteTracker />
      <Routes>
        <Route path="/" element={<TrebolaLandingPage />} />
        <Route path="/2" element={<LandingPage2 />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/es" element={<TrebolaLandingPageES />} />
        <Route path="/es/2" element={<LandingPage2ES />} />
        <Route path="/es/thank-you" element={<ThankYouPageES />} />
        {/* Squeeze variants — Spanish at root (legacy, matches Meta ad URLs)
            and English under /en/. Both share the same SqueezeLayout that
            picks copy from squeezeContent based on the `lang` prop. */}
        <Route path="/escape" element={<SqueezeEscape lang="es" />} />
        <Route path="/oportunidad-perdida" element={<SqueezeOportunidadPerdida lang="es" />} />
        <Route path="/accesibilidad" element={<SqueezeAccesibilidad lang="es" />} />
        <Route path="/seguridad" element={<SqueezeSeguridad lang="es" />} />
        <Route path="/premium" element={<SqueezePremium lang="es" />} />
        <Route path="/en/escape" element={<SqueezeEscape lang="en" />} />
        <Route path="/en/oportunidad-perdida" element={<SqueezeOportunidadPerdida lang="en" />} />
        <Route path="/en/accesibilidad" element={<SqueezeAccesibilidad lang="en" />} />
        <Route path="/en/seguridad" element={<SqueezeSeguridad lang="en" />} />
        <Route path="/en/premium" element={<SqueezePremium lang="en" />} />
        {/* Per-angle thank-you pages — one URL per angle for ad-platform tracking */}
        <Route path="/gracias/:angle" element={<SqueezeThankYou lang="es" />} />
        <Route path="/en/gracias/:angle" element={<SqueezeThankYou lang="en" />} />
      </Routes>
    </Router>
  );
}

export default App;
