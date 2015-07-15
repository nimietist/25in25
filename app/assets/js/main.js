import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './routes';
// import jquery from 'jquery';

/**
 * This render bootstraps client side router
 */
React.render(
  <Router history={history} children={routes} />,
  document.getElementById('react-root')
);
