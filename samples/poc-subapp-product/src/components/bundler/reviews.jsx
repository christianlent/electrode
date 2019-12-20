import { fetchReviews } from "../redux-reviews/actions";
import reducer from "../redux-reviews/reducer";

export default {
  name: "reviews",
  init: () => {},
  doFetchReviews: fetchReviews,
  reducer: ({dispatch, getState}) => reducer(dispatch, getState),

  selectAllReviews: (state) => {
    return state.reviews;
  },
}
