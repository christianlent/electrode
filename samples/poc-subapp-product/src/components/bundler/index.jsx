import { composeBundles } from 'redux-bundler';
import products from './products';
import reviews from './reviews';

const createStore = composeBundles(
  products,
  reviews
);

export { createStore };
