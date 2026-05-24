import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
