import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItemId } from "../api";
import { fetchProduct } from "./actions";

export default Renderer => {
  const Component = (props) => {
    const { products, dispatch } = props;
    const id = getItemId();
    const result = products[id];
    useEffect(() => {
      if (result) {
        return;
      }
      dispatch(fetchProduct(id));
    }, [props.products]);
    if (!result || !Object.keys(result).length) {
      return null;
    }
    return <Renderer product={result} />
  }

  const mapStateToProps = (state) => ({products: state.products});
  return connect(mapStateToProps)(Component);
}