import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.jsx';
import './index.css';

// The <Provider> component makes the Redux store available to any nested components
// that need to access the Redux store. We wrap our entire app to ensure all components can connect.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
