const FETCH_REVIEWS = "FETCH_REVIEWS";
const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";

export default {
  name: 'reviews',

  reducer: (state = {}, action) => {
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
  },

  selectAllReviews: (state) => {
    return state.reviews;
  },

  doFetchReviews: (id) => async ({ dispatch }) => {
    dispatch({ type: FETCH_REVIEWS, id });
    const response = await fetch(`/api/review?itemId=${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_REVIEWS_SUCCESS, id, data });
  },

  init: store => {},
}
