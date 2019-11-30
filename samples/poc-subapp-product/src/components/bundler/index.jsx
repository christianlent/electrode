import { composeBundles } from 'redux-bundler';
import products from './products';
import reviews from './reviews';

const shared = typeof global !== "undefined" ? global : window;

function getStore() {
  const createStore = composeBundles(
    products,
    reviews
  );

  return createStore({});
}

if (!shared.store) {
  shared.store = getStore();
}

export default shared.store;