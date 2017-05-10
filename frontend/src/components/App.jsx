import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ProductDetail, ProductList } from 'apps/products/components';

import Menu from './Menu';

@connect(store => ({
  route: store.router.route,
}))
export default class App extends Component {
  render() {
    const Page = this.props.route.page;
    const pageInstance = Page ? <Page /> : null;

    return (
      <div>
        <Menu />
        <div className="container layout">
          { pageInstance }
        </div>
      </div>
    );
  }
}
