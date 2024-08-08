import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bulma/css/bulma.min.css';

import App from './App';
import { AppContextProvider } from './context';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>

    </BrowserRouter>
  </React.StrictMode>
);

