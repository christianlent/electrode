import React, { useEffect } from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { connect } from "react-redux";
import { Breadcrumbs, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getItemId } from "../components/api";
import { makeImportant } from "../components/global";
import { fetchProduct } from "../components/redux-product/actions";
import reduxCreateStore from "../components/store";
import reduxReducers from "./reducers";

const useStyles = makeStyles(makeImportant({
  breadcrumbs: {
    height: 40,
    fontFamily: "Bogle",
    lineHeight: "50px",
    marginLeft: 15,
    fontSize: 14,
  },
  here: {
    color: "black"
  }
}));

const Component = (props) => {
  const classes = useStyles();
  const { allProducts, dispatch } = props;
  const id = getItemId();
  const result = allProducts[id];
  useEffect(() => {
    if (result) {
      return;
    }
    dispatch(fetchProduct(id));
  }, [props.products]);
  if (!result || !Object.keys(result).length) {
    return null;
  }

  const product = result.payload.products[result.payload.selected.product];
  const { path } = product.productAttributes.productCategory;
  return (
    <Breadcrumbs className={classes.breadcrumbs}>
      {path.map((p, index) =>
        <Link key={index} color="inherit" href={`https://www.walmart.com${p.url}`}>
          {p.name}
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default reduxLoadSubApp({
  name: "Breadcrumbs",
  reduxCreateStore: reduxCreateStore(reduxReducers),
  reduxReducers,
  reduxShareStore: true,
  Component: connect((state) => ({allProducts: state.products}))(Component),
});
