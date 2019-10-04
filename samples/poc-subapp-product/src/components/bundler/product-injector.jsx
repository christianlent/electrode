import React, { useEffect } from "react";
import { getItemId } from "../api";
import { connect } from "redux-bundler-preact";

export default Renderer => {
  const Component = (props) => {
    const { allProducts, doFetchProduct } = props;
    const id = getItemId();
    const result = allProducts[id];
    useEffect(() => {
      if (result) {
        return;
      }
      doFetchProduct(id);
    }, [props.products]);
    if (!result || !Object.keys(result).length) {
      return null;
    }
    return <Renderer product={result} />
  }

  return connect(
    "doFetchProduct",
    "selectAllProducts",
    Component
  );
}
