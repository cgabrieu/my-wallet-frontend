import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AlertsProvider from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <AlertsProvider>
      <App />
    </AlertsProvider>
  </AuthProvider>,
  document.getElementById('root')
);
