import React, { useState, useEffect } from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { Fab, FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchProduct } from "../components/api2";
import Rating from '@material-ui/lab/Rating';
import Gallery from "../components/gallery";

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const useStyles = makeStyles({
  add: {
    backgroundColor: "#0065ff",
    color: "white",
    fontFamily: "Bogle !important",
    marginLeft: 25,
    marginTop: 25,
    textTransform: "initial",
  },
  cost: {
    fontFamily: "Bogle !important",
    marginTop: 25,
  },
  product: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  rating: {
    color: "black"
  },
  link: {
    marginLeft: 10,
    color: "black",
    textDecoration: "underline",
  },
  text: {
    fontFamily: "Bogle !important",
    paddingBottom: 25,
  },
  vitals: {
    marginLeft: 50,
    maxWidth: "40%",
    flexDirection: "column",
    flexBasis: "100%",
  }
});

const Component = (props) => {
  const classes = useStyles();
  const [result, setResult] = useState();
  useEffect(() => {
    const fet = fetchProduct("5f3b5957-5d5d-4ff6-a40d-bfed349faf09");
    fet.then(setResult);
  });
  if (!result) {
    return null;
  }
  const product = result.payload.products[result.payload.selected.product];
  const offer = result.payload.offers[product.offers[0]];
  const { price } = offer.pricesInfo.priceMap.CURRENT;
  return (
    <div className={classes.product}>
      <Gallery result={result} />
      <div className={classes.vitals}>
        <Typography variant="h5" className={classes.text}>
          {product.productAttributes.productName}
        </Typography>
        <Rating
          value={product.productAttributes.averageRating}
          className={classes.rating}
          readOnly
        />
        <a className={classes.link} href="#">
          {product.productAttributes.numberOfReviews} review{product.productAttributes.numberOfReviews ? "s" : ""}
        </a>
        <a className={classes.link} href={`https://www.walmart.com/tp/${slugify(product.productAttributes.brand)}`}>
          {product.productAttributes.brand}
        </a>
        <Typography variant="h4" className={classes.cost}>
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
        <FormControl className={classes.cost}>
          <InputLabel htmlFor="quantity-simple">Qty:</InputLabel>
          <Select value={1} inputProps={{name: 'quantity', id: 'quantity-simple'}}>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((v) =>
              <MenuItem key={v} value={v}>{v}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Fab variant="extended" className={classes.add}>
          Add to Cart
        </Fab>
      </div>
    </div>
  );
};

export default reduxLoadSubApp({
  name: "Product",
  Component,
});
