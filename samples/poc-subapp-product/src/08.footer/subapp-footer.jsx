import React from "react";
import { loadSubApp } from "subapp-web";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  left: {
    float: "left",
  },
  main: {
    paddingBottom: 25,
    margin: 15,
    marginTop: 50,
  },
  right: {
    float: "right",
  },
});

const Component = (props) => {
  const classes = useStyles();
  const date = new Date();
  return (
    <div className={classes.main}>
      <span className={classes.left}>© {date.getFullYear()} Walmart. All Rights Reserved.</span>
      <span className={classes.right}>To ensure we are able to help you as best we can, please include your reference number: UQQ5XLJXEP</span>
    </div>
  );
};

export default loadSubApp({
  name: "Footer",
  Component,
});