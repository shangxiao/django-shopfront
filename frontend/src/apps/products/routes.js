import { ProductDetail, ProductList } from './components';

export default {
  '/products/{id}': ProductDetail,
  '/': ProductList,
};
