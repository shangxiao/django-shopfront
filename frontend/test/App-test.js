import React from 'react';
import { Provider } from 'react-redux'
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import App from 'components/App';
import store from 'store';
import { Route } from 'apps/router';
import { setRoute } from 'apps/router/actions';
import { ProductList } from 'apps/products/components';

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

    const listRoute = new Route(ProductList);
    store.dispatch(setRoute(listRoute));

    const wrapper = mount(<Provider store={store}><App /></Provider>);
    setImmediate(() => {
      const li = wrapper.find('li');
      expect(li).to.have.length(1);
      expect(li.text()).to.equal('molte');
    });
  });

});
