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
        {/* Squeeze variants — Spanish-first */}
        <Route path="/escape" element={<SqueezeEscape />} />
        <Route path="/oportunidad-perdida" element={<SqueezeOportunidadPerdida />} />
        <Route path="/accesibilidad" element={<SqueezeAccesibilidad />} />
        <Route path="/seguridad" element={<SqueezeSeguridad />} />
        {/* Per-angle thank-you pages — one URL per angle for ad-platform tracking */}
        <Route path="/gracias/:angle" element={<SqueezeThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
