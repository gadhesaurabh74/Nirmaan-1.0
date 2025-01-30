import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter here
import App from './App';  // Import App component
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* Wrap your entire app with BrowserRouter here */}
    <App />
  </BrowserRouter>
);
