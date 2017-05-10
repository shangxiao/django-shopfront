import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import thunk from 'redux-thunk';

import App from 'components/App';
import rootReducer from 'rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

describe('<App />', () => {
  beforeEach(() => {
    fetchMock.mock('/api/products/', [{
      id: 1,
      name: 'molte',
    }]);
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('calls render', () => {
    sinon.spy(App.prototype, 'render');
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    setImmediate(() => {
      const li = wrapper.find('li');
      expect(li).to.have.length(1);
      expect(li.text()).to.equal('molte');
    });
  });

});
