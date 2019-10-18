import React, {useEffect, useState} from "react";
import { loadSubApp } from "subapp-web";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchProduct } from "../components/api";

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
  const [result, setResult ] = useState();
  useEffect(() => {
    if (result) {
      return;
    }
    fetchProduct("55042612").then(setResult);
  });
  if (!result) {
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

export default loadSubApp({
  name: "About",
  Component,
});