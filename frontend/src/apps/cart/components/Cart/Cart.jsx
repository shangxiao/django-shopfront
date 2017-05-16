/* eslint-disable  class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Cart as CartModel } from 'apps/cart/models';

@connect(state => ({
  cart: state.cart.cart,
}))
export default class Cart extends Component {
  static propTypes = {
    cart: PropTypes.instanceOf(CartModel).isRequired,
  }

  static renderNoItems() {
    return (
      <div><em>There are no items in your cart</em></div>
    );
  }

  renderItems() {
    return <div>todo</div>;
  }

  render() {
    const cartContent = this.props.cart.products.length === 0
      ? Cart.renderNoItems()
      : this.renderItems();

    return (
      <div>
        <h1>Cart</h1>
        {cartContent}
      </div>
    );
  }
}
