import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getProducts } from 'actions/products';

import './Products.scss';

@connect(state => ({
  products: state.products.products,
  isLoading: state.products.fetchingProducts,
}))
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  renderCell(product) {
    return (
      <div className="col-12 col-sm-6 col-lg-3 Products__cell" key={product.id}>
        <div>
          <img src={product.image_url} />
          <div>
            <span className="Products__name">{product.name}</span>
            <span className="Products__description">{product.description}</span>
          </div>
          <div className="Products__price">${product.price}</div>
        </div>
      </div>
    )
  }

  renderProducts(products) {
    if (this.props.isLoading) {
      return <div>Loading…</div>;
    }

    if (products.length === 0) {
      return <div><em>No products listed</em></div>;
    }

    return (
      <div className="row">
        {products.map(product => this.renderCell(product))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 className="Products__heading">Products</h1>
        <div>
          {this.renderProducts(this.props.products)}
        </div>
      </div>
    );
  }
}
