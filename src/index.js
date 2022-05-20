import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/index';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ruLocale from "date-fns/locale/ru"









ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocalizationProvider>,
  document.getElementById('root')
);


