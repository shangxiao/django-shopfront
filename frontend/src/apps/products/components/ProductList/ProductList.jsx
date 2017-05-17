import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { CartControls } from 'apps/cart/components';
import { Link } from 'apps/router/components';

import { getProducts } from '../../actions';

import './ProductList.scss';

@connect(state => ({
  products: state.products.products,
  isLoading: state.products.fetchingProducts,
}))
export default class ProductList extends Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  static renderCell(product) {
    return (
      <div className="col-12 col-sm-6 col-lg-3 Products__cell" key={product.id}>
        <Link href={`/products/${product.id}`}>
          <img src={product.image_url} alt={product.name} />
          <div>
            <span className="Products__name">{product.name}</span>
            <span className="Products__description">{product.description}</span>
          </div>
        </Link>
        <div className="Products__cell-footer">
          <Link href={`/products/${product.id}`} className="Products__price">${product.price}</Link>
          <CartControls product={product} size="small" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch(getProducts());
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
        {products.map(product => ProductList.renderCell(product))}
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
