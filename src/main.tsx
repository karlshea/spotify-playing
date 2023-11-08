import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import SecuredApp from './SecuredApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SecuredApp />
  </React.StrictMode>
);
