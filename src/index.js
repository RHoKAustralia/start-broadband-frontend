import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import routes from 'routes';
import 'normalize.css';
import './global/css/typesetting.css';

render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById('react')
);
