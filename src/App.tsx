import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrebolaLandingPage from './pages/TrebolaLandingPage';
import ThankYouPage from './pages/ThankYouPage';
import TrebolaLandingPageES from './pages/TrebolaLandingPageES';
import ThankYouPageES from './pages/ThankYouPageES';
import LandingPage2 from './pages/LandingPage2';
import LandingPage2ES from './pages/LandingPage2ES';

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
      </Routes>
    </Router>
  );
}

export default App;
