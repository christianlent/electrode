import React from "react";
import { loadSubApp } from "subapp-web";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";
import Check from "@material-ui/icons/Check";
import { makeStyles } from '@material-ui/styles';
import { InputAdornment, TextField, Link } from "@material-ui/core";
import { makeImportant } from "../components/global";

const useStyles = makeStyles(makeImportant({
  descriptor: {
  },
  detailIcon: {
    display: "inline-block",
    marginRight: 10,
    marginTop: 10,
    width: 20,
  },
  main: {
    top: "50%",
    left: "50%",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,.07), 0 3px 13px 0 rgba(0,0,0,.16)",
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    transform: `translate(-50%, -50%)`,
    width: 400,
  },
  section: {
    borderBottom: "1px solid #e6e7e8",
    paddingBottom: 10,
    paddingTop: 10,
  },
  updateLocation: {
    color: "black",
    display: "block",
    marginTop: 10,
    textAlign: "right",
    textDecoration: "underline",
  },
}));

const Component = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <TextField
        label="Enter ZIP code or city, state"
        value="94066"
        style={{width: "100%"}}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <Check style={{color: "green"}} />
          </InputAdornment>
        }}
      />
      <Link className={classes.updateLocation}>Update Location</Link>
      <div className={classes.section}>
        <LocalShippingOutlined className={classes.detailIcon} />
        <strong className={classes.descriptor}>Delivery Options</strong>
      </div>
    </div>
  );
};

export default loadSubApp({
  name: "Delivery",
  Component,
});
