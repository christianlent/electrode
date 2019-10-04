import {FETCH_REVIEWS, FETCH_REVIEWS_SUCCESS} from "./types";

export const fetchReviews = (id) => {
  return async ({ dispatch }) => {
    dispatch({ type: FETCH_REVIEWS, id });
    const response = await fetch(`/api/review?itemId=${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_REVIEWS_SUCCESS, id, data });
  }
};
