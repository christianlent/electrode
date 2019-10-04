import {FETCH_REVIEWS, FETCH_REVIEWS_SUCCESS} from "./types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      state[action.id] = {};
      break;
    case FETCH_REVIEWS_SUCCESS:
      state = {...state};
      state[action.id] = action.data;
      break;
  }
  return state;
};
