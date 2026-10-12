import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { captureVisitorOrigin } from './utils/tracking';
// Library defaults must load BEFORE index.css so our overrides win.
import 'react-phone-number-input/style.css';
import './index.css';

// First-visit referrer + landing page, before any in-app navigation can change the URL.
captureVisitorOrigin();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
