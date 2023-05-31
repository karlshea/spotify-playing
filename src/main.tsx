import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import SecuredApp from './SecuredApp.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SecuredApp />
  </React.StrictMode>
);
