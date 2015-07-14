// import 'html5-history-api';
// import page from 'page';

import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import App from './app';
import routes from './routes';

React.render(<Router history={history} children={routes} />, document.getElementById('react-root'));
