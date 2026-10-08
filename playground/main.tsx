import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../client/styles/doc-sdk.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
