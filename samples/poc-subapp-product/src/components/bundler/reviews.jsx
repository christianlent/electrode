import { fetchReviews } from "../redux-reviews/actions";
import reducer from "../redux-reviews/reducer";

export default {
  name: "reviews",
  init: () => {},
  doFetchReviews: fetchReviews,
  reducer,

  selectAllReviews: (state) => {
    return state.reviews;
  },
}
