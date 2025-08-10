import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import DirectionProvider from './providers/DirectionProvider';

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <DirectionProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </DirectionProvider>
  </I18nextProvider>
);
