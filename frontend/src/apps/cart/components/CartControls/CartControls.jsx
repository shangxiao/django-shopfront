import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { Cart } from 'apps/cart/models';
import { addItem, subtractItem } from 'apps/cart/actions';

@connect(state => ({
  cart: state.cart.cart,
}))
export default class CartControls extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,  // eslint-disable-line
    cart: PropTypes.instanceOf(Cart).isRequired,
  };

  @autobind
  handleAddItem(product) {
    return () => {
      this.props.dispatch(addItem(product.id));
    };
  }

  @autobind
  handleSubtractItem(product) {
    return () => {
      this.props.dispatch(subtractItem(product.id));
    };
  }

  render() {
    const { product } = this.props;
    const groupAriaLabel = `Add or remove the product ${product.name} from the cart`;
    const addAriaLabel = `Add the product ${product.name} to the cart`;
    const removeAriaLabel = `Remove the product ${product.name} from the cart`;
    const quantity = this.props.cart.getProductQuantity(product.id);

    return (
      <div className="btn-group btn-group-sm" role="group" ariaLabel={groupAriaLabel}>
        <button type="button" className="btn btn-secondary" ariaLabel={addAriaLabel} onClick={this.handleAddItem(product)}>+</button>
        <span className="btn btn-secondary">{quantity}</span>
        <button type="button" className="btn btn-secondary" ariaLabel={removeAriaLabel} onClick={this.handleSubtractItem(product)}>-</button>
      </div>
    );
  }
}
