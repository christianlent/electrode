import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItemId } from "../api";
import { fetchReviews } from "./actions";

export default Renderer => {
  const Component = (props) => {
    const { reviews, dispatch } = props;
    const id = getItemId();
    const result = reviews[id];
    useEffect(() => {
      if (result) {
        return;
      }
      dispatch(fetchReviews(id));
    }, [props.reviews]);
    if (!result || !Object.keys(result).length) {
      return null;
    }
    return <Renderer reviews={result} />
  }

  const mapStateToProps = (state) => ({reviews: state.reviews});
  return connect(mapStateToProps)(Component);
}