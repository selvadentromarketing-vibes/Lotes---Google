import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { captureAdAttribution, captureVisitorOrigin } from './utils/tracking';
// Library defaults must load BEFORE index.css so our overrides win.
import 'react-phone-number-input/style.css';
import './index.css';

// First-visit referrer + landing page, and the UTM/click-ID block, before any
// in-app navigation can drop the query string.
captureVisitorOrigin();
captureAdAttribution();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
