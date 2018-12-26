import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { addLocaleData } from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlZH from 'react-intl/locale-data/zh';
import intlRU from 'react-intl/locale-data/ru';
import intlKO from 'react-intl/locale-data/ko';
import ConnectIntlProvider from './connect-intl-provider';
import configureStore from './store/configureStore';
import routes from './routes';

addLocaleData([...intlEN, ...intlZH, ...intlRU, ...intlKO]);

const store = configureStore({});

render(
  <Provider store={store}>
    <ConnectIntlProvider>
      <Router>{renderRoutes(routes)}</Router>
    </ConnectIntlProvider>
  </Provider>,
  document.getElementById('react-app-container')
);
