const FETCH_PRODUCT = "FETCH_PRODUCT";
const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";

export default {
  name: 'products',

  reducer: (state = {}, action) => {
    switch (action.type) {
      case FETCH_PRODUCT:
        state = {...state};
        state[action.id] = {};
        break;
      case FETCH_PRODUCT_SUCCESS:
        state = {...state};
        state[action.id] = action.data;
        break;
    }
    return state;
  },

  selectAllProducts: (state) => {
    return state.products;
  },

  doFetchProduct: (id) => async ({ dispatch, getState }) => {
    const state = getState();
    if (state.products[id]) {
      return;
    }
    dispatch({ type: FETCH_PRODUCT, id });
    const response = await fetch(`/api/product?itemId=${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_PRODUCT_SUCCESS, id, data });
  },

  init: store => {},
}
