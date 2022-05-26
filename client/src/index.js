import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalReset from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Fragment>
      <GlobalReset />
      <App />
    </Fragment>
  </React.StrictMode>
);
