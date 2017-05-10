import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProduct } from '../../actions';

import './ProductDetail.scss';

@connect(state => ({
  productId: state.router.route.params.id,
  product: state.products.product,
  isLoading: state.products.fetchingProduct,
}))
export default class ProductDetail extends Component {
  componentDidMount() {
    this.props.dispatch(getProduct(this.props.productId));
  }

  render() {
    return (
      <div>
        <h1>Product Detail</h1>
        <div className="ProductDetail__layout">
          <div className="ProductDetail__image">
            <img src={this.props.product.image_url} />
          </div>
          <div className="ProductDetail__details">
            <div className="ProductDetail__name">{this.props.product.name}</div>
            <div className="ProductDetail__description">{this.props.product.description}</div>
            <div className="ProductDetail__price">${this.props.product.price}</div>
          </div>
        </div>
      </div>
    );
  }
}
