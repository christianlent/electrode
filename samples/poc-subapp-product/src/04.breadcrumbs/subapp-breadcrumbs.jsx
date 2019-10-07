import React, {useEffect, useState} from "react";
import { reduxLoadSubApp } from "subapp-redux";
import { Breadcrumbs, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchProduct } from "../components/api";

const useStyles = makeStyles({
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
});

const Component = (props) => {
  const classes = useStyles();
  const [result, setResult ] = useState();
  useEffect(() => {
    const fet = fetchProduct("5f3b5957-5d5d-4ff6-a40d-bfed349faf09");
    fet.then(setResult);
  });
  if (!result) {
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
      <span className={classes.here}>Shop all Instant Pot</span>
    </Breadcrumbs>
  );
};

export default reduxLoadSubApp({
  name: "Breadcrumbs",
  Component,
});