import React from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { fetchProduct } from "../components/api";

const useStyles = makeStyles({
  root: {},
  img: {
    width: 50,
  },
});

const Component = (props) => {
  const classes = useStyles();
  const result = fetchProduct("5f3b5957-5d5d-4ff6-a40d-bfed349faf09");
  const product = result.payload.products[result.payload.selected.product];
  const images = product.images.map((imageId) => {
    return result.payload.images[imageId];
  });
  return (
    <div className={classes.root}>
      {images.map((image) =>
        <img key={image.assetId} src={image.assetSizeUrls.DEFAULT} className={classes.img} />
      )}
    </div>
  );
};

export default reduxLoadSubApp({
  name: "Product",
  Component,
});
