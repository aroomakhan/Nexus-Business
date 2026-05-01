// 1. MUST BE AT THE VERY TOP (Before any other imports)

import { Buffer } from 'buffer';
window.Buffer = Buffer;

(window as any).global = window;
(window as any).Buffer = window.Buffer || Buffer;
(window as any).process = {
    env: { NODE_ENV: 'development' },
    nextTick: (cb: any) => setTimeout(cb, 0),
    browser: true,
} as any;

// 2. Now import the rest of your app
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

