import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('React script loaded');

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('Root element found:', document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
}
