import React, { useEffect } from "react";
import { getItemId } from "../api";
import { connect } from "redux-bundler-preact";

export default Renderer => {
  const Component = (props) => {
    const { allReviews, doFetchReviews } = props;
    const id = getItemId();
    const result = allReviews[id];
    useEffect(() => {
      if (result) {
        return;
      }
      doFetchReviews(id);
    }, [props.products]);

    if (!result || !Object.keys(result).length) {
      return null;
    }
    return <Renderer reviews={result} />
  }

  return connect(
    "doFetchReviews",
    "selectAllReviews",
    Component
  );
}
