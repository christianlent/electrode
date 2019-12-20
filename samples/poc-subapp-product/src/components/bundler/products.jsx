import { fetchProduct } from "../redux-product/actions";
import reducer from "../redux-product/reducer";

export default {
  name: "products",
  init: () => {},
  doFetchProduct: fetchProduct,
  reducer: ({dispatch, getState}) => reducer(dispatch, getState),

  selectAllProducts: (state) => {
    return state.products;
  },
}
