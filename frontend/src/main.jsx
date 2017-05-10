import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import App from 'components/App';
import rootReducer from 'reducers/index';

import './main.scss';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('components/App', () => { render(App) });
}
