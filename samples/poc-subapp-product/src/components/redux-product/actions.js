import {FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS} from "./types";

export const fetchProduct = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.products[id]) {
      return;
    }
    dispatch({ type: FETCH_PRODUCT, id });
    const response = await fetch(`/api/product?itemId=${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_PRODUCT_SUCCESS, id, data });
  }
};
