import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

// Register Service Worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('ServiceWorker registration successful with scope:', reg.scope))
      .catch(err => console.error('ServiceWorker registration failed:', err));
  });
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);