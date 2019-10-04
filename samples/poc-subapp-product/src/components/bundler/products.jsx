import { fetchProduct } from "../redux-product/actions";
import reducer from "../redux-product/reducer";

export default {
  name: "products",
  init: () => {},
  doFetchProduct: (id) => ({dispatch, getState}) => fetchProduct(id)(dispatch, getState),
  reducer,

  selectAllProducts: (state) => {
    return state.products;
  },
}
