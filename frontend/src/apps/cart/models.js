/* eslint-disable import/prefer-default-export, camelcase */

import safe from 'safeClass';

@safe
export class Cart {
  constructor({ products = [] } = {}) {
    this.products = products;
  }

  getProductQuantity(productId) {
    const product = this.products.find(prod => prod.product_id === productId);
    return product
      ? product.quantity
      : 0;
  }
}

@safe
export class CartProduct {
  constructor({ product_id, quantity = 1 } = {}) {
    this.product_id = product_id;
    this.quantity = quantity;
  }
}

export function cartReviver(key, value) {
  switch (key) {
    case '':
      return new Cart(value);

    case 'products':
      return value.map(product => new CartProduct(product));

    default:
      return value;
  }
}
