import React, { Component } from 'react';

import Products from 'components/Products';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Django Shopfront</h1>
        <Products />
      </div>
    );
  }
}
