import React, {useEffect, useState} from "react";
import { loadSubApp } from "subapp-web";
import { Breadcrumbs, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchProduct } from "../components/api";
import { makeImportant } from "../components/global";

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

export default loadSubApp({
  name: "Breadcrumbs",
  Component,
});