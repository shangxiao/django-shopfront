import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProductDetail, ProductList } from 'apps/products/components';

@connect(store => ({
  route: store.router.route,
}))
export default class App extends Component {
  render() {
    const Page = this.props.route.page;
    const pageInstance = Page ? <Page /> : null;

    return (
      <div>
        <h1>Django Shopfront</h1>
        { pageInstance }
      </div>
    );
  }
}
