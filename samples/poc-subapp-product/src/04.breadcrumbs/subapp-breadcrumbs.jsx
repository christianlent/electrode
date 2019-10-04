import React, { useEffect } from "react";
import { connect, Provider } from 'redux-bundler-react'
import { reduxLoadSubApp } from "subapp-redux";
import store from "../components/bundler";
import { Breadcrumbs, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getItemId } from "../components/api";
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
  const { allProducts } = props;
  const id = getItemId();
  const result = allProducts[id];
  useEffect(() => {
    if (result) {
      return;
    }
    props.doFetchProduct(id);
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
      <span className={classes.here}>Shop all Instant Pot</span>
    </Breadcrumbs>
  );
};

const ConnectedComponent = connect(
  "doFetchProduct",
  "selectAllProducts",
  Component
);

const ProvisionedComponent = () => (
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>
);

export default reduxLoadSubApp({
  name: "Breadcrumbs",
  reduxCreateStore: () => store,
  Component: ProvisionedComponent,
});
