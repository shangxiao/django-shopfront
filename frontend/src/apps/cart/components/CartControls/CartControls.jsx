import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
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
    size: PropTypes.string,
  };

  static defaultProps = {
    size: 'large',
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

  renderNotInCart() {
    const { product } = this.props;
    const addLabel = `Add the product ${product.name} to the cart`;
    const buttonClassName = classNames('btn btn-primary', {
      'btn-sm': this.props.size === 'small',
    });
    return (
      <button type="button" className={buttonClassName} title={addLabel} ariaLabel={addLabel} onClick={this.handleAddItem(product)}>+</button>
    );
  }

  renderInCart(quantity) {
    const { product } = this.props;
    const groupLabel = `Add or remove the product ${product.name} from the cart`;
    const addLabel = `Add the product ${product.name} to the cart`;
    const removeLabel = `Remove the product ${product.name} from the cart`;
    const groupClassNames = classNames('btn-group', {
      'btn-group-sm': this.props.size === 'small',
    });

    return (
      <div className={groupClassNames} role="group" ariaLabel={groupLabel}>
        <button type="button" className="btn btn-primary" title={addLabel} ariaLabel={addLabel} onClick={this.handleAddItem(product)}>+</button>
        <span className="btn btn-secondary">{quantity}</span>
        <button type="button" className="btn btn-secondary" title={removeLabel} ariaLabel={removeLabel} onClick={this.handleSubtractItem(product)}>-</button>
      </div>
    );
  }

  render() {
    const quantity = this.props.cart.getProductQuantity(this.props.product.id);
    return quantity === 0
      ? this.renderNotInCart()
      : this.renderInCart(quantity);
  }
}
