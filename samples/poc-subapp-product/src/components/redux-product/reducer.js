import {FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS} from "./types";

export default (state = {}, action) => {
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
};
