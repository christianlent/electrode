import { composeBundles } from 'redux-bundler';
import products from './products';
import reviews from './reviews';
import withReduxBundler from './with';

const createStore = composeBundles(
  products,
  reviews
);

export { createStore, withReduxBundler };
