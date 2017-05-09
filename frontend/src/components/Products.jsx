import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from 'actions/products';

@connect(state => ({
  products: state.products.products,
}))
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  renderProducts() {
    return this.props.products.length === 0
      ? <li><em>No products listed</em></li>
      : this.props.products.map(product =>
        <li key={product.id}>{product.name}</li>
      );
  }

  render() {
    return (
      <div>
        <h1>Products</h1>
        <ul>
          {this.renderProducts()}
        </ul>
      </div>
    );
  }
}
