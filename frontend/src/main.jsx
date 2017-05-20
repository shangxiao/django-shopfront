import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from 'components/App';

import routes from './apps/router/router';
import store from './store';

import './styles/main.scss';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('components/App', () => { render(App); });

  // accept all the routes
  (new Set(Object.values(routes))).forEach((routeComponent) => {
    module.hot.accept(routeComponent);
  });
}
