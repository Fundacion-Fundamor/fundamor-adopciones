import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthState from './context/auth/authState';
import './scss/_global.scss';
import './scss/_typography.scss';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);


