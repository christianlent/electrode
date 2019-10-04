import React from "react";
import { useState } from 'preact/hooks';
import { reduxBundlerLoadSubApp } from "subapp-pbundle";
import { Fab, FormControl, Grid, InputLabel, Modal, Select, MenuItem, Typography } from "@material-ui/core";
import CardGiftcard from "@material-ui/icons/CardGiftcard";
import HouseOutlined from "@material-ui/icons/HouseOutlined";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";
import Menu from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import Rating from "@material-ui/lab/Rating";
import Gallery from "../components/gallery";
import logo from "../components/logo.svg";
import { makeImportant } from "../components/global";
import productBundle from "../components/bundler/products";
import ProductInjector from "../components/bundler/product-injector";
import { dynamicLoadSubApp } from "subapp-web";

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

const useStyles = makeStyles(makeImportant({
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
  button: {
    backgroundColor: "white",
    border: "1px solid black",
    boxShadow: "none",
    color: "black",
    fontFamily: "Bogle !important",
    height: 28,
    marginTop: 25,
    textTransform: "initial",
  },
  cost: {
    fontFamily: "Bogle !important",
    marginTop: 25,
  },
  descriptor: {
    marginTop: "-15px",
  },
  detailIcon: {
    display: "inline-block",
    marginRight: 10,
    width: 20,
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
  main: {
    marginTop: 25,
  },
  section: {
    borderBottom: "1px solid #e6e7e8",
    paddingBottom: 10,
    paddingTop: 10,
  },
  separator: {
    marginLeft: 25,
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
}));

const DeliveryOptionsModal = (props) => {
  const id = "delivery_01";
  dynamicLoadSubApp({ name: "Delivery", id });
  return (
    <Modal open={true} {...props}>
      <div id={id} />
    </Modal>
  );
}

const Component = (props) => {
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const { product: result } = props;

  if (!result || !Object.keys(result).length) {
    return null;
  }

  const product = result.payload.products[result.payload.selected.product];
  const offer = result.payload.offers[product.offers[0]];
  const { price } = offer.pricesInfo.priceMap.CURRENT;
  return (
    <Grid container justify="center" className={classes.main}>
      {modal &&
        <DeliveryOptionsModal onClose={() => setModal(false)} />
      }
      <Grid item xs={12} md={4} lg={4}>
        <Gallery result={result} />
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
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
        <div className={classes.section}>
          <LocalShippingOutlined className={classes.detailIcon} />
          <strong className={classes.descriptor}>Free 2-day delivery</strong>
          <p>
            <span className={classes.detailIcon}>&nbsp;</span>
            Arrives by Tue, Oct 8
          </p>
        </div>
        <div className={classes.section}>
          <HouseOutlined className={classes.detailIcon} />
          <strong className={classes.descriptor}>Free pickup today</strong>
          <p>
            <span className={classes.detailIcon}>&nbsp;</span>
            <strong>In stock at</strong> Union City, 30600 Dyer St
          </p>
        </div>
        <div className={classes.section}>
          <a href="#" className={classes.link} onClick={() => setModal(true)}>More delivery &amp; pickup options</a>
        </div>
        <div className={classes.section}>
          <img src={logo} className={classes.detailIcon} />
          Sold &amp; shipped by Walmart
        </div>
        <div className={classes.section}>
          <Menu className={classes.detailIcon} />Add to List
          <CardGiftcard className={classes.separator} />Add to Registry
        </div>
        <div className={classes.section}>
          <Typography variant="h5">Product Highlights</Typography>
          <div dangerouslySetInnerHTML={{__html: product.productAttributes.shortDescription}} />
          <Fab variant="extended" className={classes.button}>
            See More Info
          </Fab>
        </div>
      </Grid>
    </Grid>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Product",
  reduxBundles: [productBundle],
  Component: ProductInjector(Component),
});
