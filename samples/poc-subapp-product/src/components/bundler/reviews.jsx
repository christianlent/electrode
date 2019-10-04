import { fetchReviews } from "../redux-reviews/actions";
import reducer from "../redux-reviews/reducer";

export default {
  name: "reviews",
  init: () => {},
  doFetchReviews: (id) => ({dispatch, getState}) => fetchReviews(id)(dispatch, getState),
  reducer,

  selectAllReviews: (state) => {
    return state.reviews;
  },
}
