/* eslint-disable import/prefer-default-export, camelcase */

import safe from 'safeClass';

@safe
export class Product {
  constructor({ name, description, price, image_url, is_swivel }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.image_url = image_url;
    this.is_swivel = is_swivel;
  }
}

export function productReviver(key, value) {
  if (key === '') {
    return new Product(value);
  }

  return value;
}
