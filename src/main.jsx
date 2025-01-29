import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n'
import Root from './Pages/App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
