/* eslint-disable import/prefer-default-export, camelcase */

import { Product } from 'apps/products/models';
import safe from 'safeClass';

@safe
export class Cart {
  constructor({ items = [] } = {}) {
    this.items = items;
  }

  getProductQuantity(productId) {
    const foundItem = this.items.find(item => item.product_id === productId);
    return foundItem
      ? foundItem.quantity
      : 0;
  }
}

@safe
export class CartProduct {
  constructor({ product_id, quantity = 1, product } = {}) {
    this.product_id = product_id;
    this.quantity = quantity;
    this.product = product;
  }
}

export function cartReviver(key, value) {
  switch (key) {
    case '':
      return new Cart(value);

    case 'items':
      return value.map(item => new CartProduct(item));

    case 'product':
      return new Product(value);

    default:
      return value;
  }
}
