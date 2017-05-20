import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Cart as CartModel } from 'apps/cart/models';
import { Link } from 'apps/router/components';
import { currency } from 'formats';

import './Cart.scss';

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
    // ideally the totals would be calculated from the ecommerce platform
    // using precise types
    const total = this.props.cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    const rows = this.props.cart.items.map((item) => {
      const productDetailUrl = `/products/${item.product_id}`;
      return (
        <tr key={item.product_id} className="Cart__row">
          <td><Link href={productDetailUrl}>{item.product.name}</Link></td>
          <td><Link href={productDetailUrl} tabIndex="-1">${item.product.price}</Link></td>
          <td><Link href={productDetailUrl} tabIndex="-1">{item.quantity}</Link></td>
          <td><Link href={productDetailUrl} tabIndex="-1">${currency(item.quantity * item.product.price)}</Link></td>
        </tr>
      );
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Item</th>
            <th>Cost per item</th>
            <th>Quantity</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>${currency(total)}</td>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    const cartContent = this.props.cart.items.length === 0
      ? Cart.renderNoItems()
      : this.renderItems();

    return (
      <div className="Cart">
        <h1>Cart</h1>
        {cartContent}
      </div>
    );
  }
}
