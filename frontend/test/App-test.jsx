import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
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
    fetchMock.mock('/api/cart/', {
      products: [],
    });
    fetchMock.mock('/accounts/profile/', {
      email: 'bugs@bunny.com',
    });
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders a product list', (done) => {
    sinon.spy(App.prototype, 'render');

    const listRoute = new Route(ProductList);
    store.dispatch(setRoute(listRoute));

    const wrapper = mount(<Provider store={store}><App /></Provider>);
    setImmediate(() => {
      const cell = wrapper.find('.Products__cell');
      expect(cell).to.have.length(1);
      expect(cell.find('.Products__name').text()).to.equal('molte');
      done();
    });
  });
});
