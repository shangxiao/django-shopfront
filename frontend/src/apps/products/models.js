/* eslint-disable import/prefer-default-export, camelcase */

import safe from 'safeClass';

@safe
export class Product {
  constructor({ id = null, name, description, price, image_url, is_swivel } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image_url = image_url;
    this.is_swivel = is_swivel;
  }
}

export function productReviver(key, value) {
  if (key === '') {
    return value instanceof Array
      ? value.map(val => new Product(val))
      : new Product(value);
  }

  return value;
}
