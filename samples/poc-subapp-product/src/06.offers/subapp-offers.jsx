import React from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { Fab, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { makeImportant } from "../components/global";
import ProductInjector from "../components/redux-product/injector";
import reduxCreateStore from "../components/store";
import reduxReducers from "./reducers";

const useStyles = makeStyles(makeImportant({
  add: {
    backgroundColor: "#0065ff",
    boxShadow: "none",
    color: "white",
    fontFamily: "Bogle !important",
    height: 40,
    marginTop: 30,
    textTransform: "initial",
  },
  img: {
    borderBottom: "1px solid #e6e7e8",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    paddingBottom: 10,
    width: "70%",
  },
  main: {
    marginTop: 50,
    paddingLeft: 15,
  },
}));

const Component = (props) => {
  const classes = useStyles();
  const { product: result } = props;

  if (!result || !Object.keys(result).length) {
    return null;
  }

  const imageLookup = result.payload.images;
  const together = result.payload.buyTogetherValue;
  let items = [
    together.anchor.productId,
    ...together.accessories.map((x) => x.productId),
  ];
  items = items.map((x) => result.payload.products[x])
  return (
    <div className={classes.main}>
      <Typography variant="h5">Better Together</Typography>
      <p></p>
      <Grid container spacing={10}>
        {items.map((product) => {
          const images = product.images.map((imageId) => {
            return imageLookup[imageId];
          });
          const primaryImage = images.find((image) => image.type === "PRIMARY");
          const offer = result.payload.offers[product.offers[0]];
          const { price } = offer.pricesInfo.priceMap.CURRENT;
          return (
            <Grid item xs={3} md={2} lg={2} key={product.productId}>
              <img src={primaryImage.assetSizeUrls.DEFAULT} className={classes.img} />
              <p>{product.productAttributes.productName}</p>
              <p><strong>{price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}</strong></p>
            </Grid>
          );
        })}
        <Grid item xs={3} md={2} lg={2}>
          <Typography variant="h5">
            Total&nbsp;=&nbsp;
            <strong>{together.totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
            })}</strong>
          </Typography>
          <span>2-day delivery</span>
          <Fab variant="extended" className={classes.add}>
            Add&nbsp;All&nbsp;to&nbsp;Cart
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

export default reduxLoadSubApp({
  name: "Offers",
  reduxCreateStore: reduxCreateStore(reduxReducers),
  reduxReducers,
  reduxShareStore: true,
  Component: ProductInjector(Component),
});
