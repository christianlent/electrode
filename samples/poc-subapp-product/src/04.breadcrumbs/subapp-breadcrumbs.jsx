import React from "react";
import { reduxBundlerLoadSubApp } from "subapp-pbundle";
import { Breadcrumbs, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { makeImportant } from "../components/global";
import productBundle from "../components/bundler/products";
import ProductInjector from "../components/bundler/product-injector";

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
  const { product: result } = props;

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

export default reduxBundlerLoadSubApp({
  name: "Breadcrumbs",
  reduxBundles: [productBundle],
  Component: ProductInjector(Component),
});
