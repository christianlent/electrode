import React from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ProductInjector from "../components/redux-product/injector";
import reduxCreateStore from "../components/store";
import reduxReducers from "./reducers";

const useStyles = makeStyles({
  add: {
    backgroundColor: "#0065ff",
    boxShadow: "none",
    color: "white",
    fontFamily: "Bogle !important",
    height: 40,
    marginLeft: 25,
    marginTop: 30,
    textTransform: "initial",
  },
  link: {
    marginLeft: 10,
    color: "black",
    textDecoration: "underline",
  },
  main: {
    marginLeft: 15,
    marginTop: 50,
  },
});

const Component = (props) => {
  const classes = useStyles();
  const { product: result } = props;

  if (!result || !Object.keys(result).length) {
    return null;
  }

  const product = result.payload.products[result.payload.selected.product];
  return (
    <div className={classes.main}>
      <Typography variant="h5">About This Item</Typography>
      <p>
        <strong>We aim to show you accurate product information.</strong>
        &nbsp;Manufacturers, suppliers and others provide what you see here, and we have not verified it.
        <a className={classes.link} href="#">See our disclaimer</a>
      </p>
      <div dangerouslySetInnerHTML={{__html: product.productAttributes.detailedDescription}} />
    </div>
  );
};

export default reduxLoadSubApp({
  name: "About",
  reduxCreateStore: reduxCreateStore(reduxReducers),
  reduxReducers,
  reduxShareStore: true,
  Component: ProductInjector(Component),
});
