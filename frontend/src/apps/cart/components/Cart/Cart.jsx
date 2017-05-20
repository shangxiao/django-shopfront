import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Cart as CartModel } from 'apps/cart/models';
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
      return (
        <tr key={item.product_id}>
          <td>{item.product.name}</td>
          <td>${item.product.price}</td>
          <td>{item.quantity}</td>
          <td>${currency(item.quantity * item.product.price)}</td>
        </tr>
      );
    });

    return (
      <table className="table table-bordered">
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
