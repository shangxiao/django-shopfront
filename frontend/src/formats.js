/* eslint-disable import/prefer-default-export */

import numeral from 'numeral';

export function currency(value) {
  return numeral(value).format('0,0.00');
}
