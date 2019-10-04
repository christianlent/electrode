import React, { useState } from "react";
import { loadSubApp } from "subapp-pbundle";
import { Switch } from "@material-ui/core";
import PersonPin from '@material-ui/icons/PersonPin';
import Info from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles';
import nextDayDelivery from "./next-day-delivery.svg";
import { makeImportant } from "../components/global";

const useStyles = makeStyles(makeImportant({
  info: {
    color: "#378090",
    margin: "0 15px 0 5px",
  },
  root: {
    background: 'linear-gradient(90deg,#0065ff,#378090 70%) 0 100% #fff no-repeat',
    backgroundSize: "100% 2px",
    height: 50,
    paddingLeft: 5,
  },
  middle: {
    lineHeight: "50px",
    verticalAlign: "middle"
  },
  bold: {
    fontWeight: "bolder",
  },
  right: {
    color: "#378090",
    float: "right",
  },
  zip: {
    textDecoration: "underline",
  }
}));

function minutesUntilDeadline() {
  var deadline = new Date();
  deadline.setHours( 16 );
  deadline.setMinutes( 15 );
  deadline.setSeconds( 0 );
  deadline.setMilliseconds( 0 );
  return ( deadline.getTime() - new Date().getTime() ) / 1000 / 60;
}

const Component = (props) => {
  const classes = useStyles();

  const totalMinutes = minutesUntilDeadline();
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const twoDaysDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 2);
  const twoDays = twoDaysDate.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const [ toggled, setToggle ] = useState();
  return (
    <div className={classes.root}>
      <span className={classes.middle}> </span>
      <Switch
        color="primary"
        checked={toggled}
        onChange={() => setToggle(!toggled)}
        value=""
      />
      <img src={nextDayDelivery} className={classes.middle} />
      <PersonPin className={classes.middle} fontSize="large" />
      <span className={classes.middle}>Delivering to </span>
      <span className={`${classes.zip} ${classes.middle}`}>94066</span>
      {totalMinutes > 0 ?
        <div className={classes.right}>
          <span className={classes.middle}>Order in </span>
          <span className={`${classes.bold} ${classes.middle}`}>
            {hours > 0 && `${hours} hr${hours === 1 ? "" : "s"}`} {minutes} min{minutes <= 1 ? "" : "s"}
          </span>
          <span className={classes.middle}> for </span>
          <span className={`${classes.bold} ${classes.middle}`}>NextDay delivery.</span>
          <Info className={`${classes.info} ${classes.middle}`} fontSize="large" />
        </div>
        : <div className={classes.right}>
          <span className={classes.middle}>
            It's past time for NextDay delivery. Get it {twoDays}.
          </span>
          <Info className={`${classes.info} ${classes.middle}`} fontSize="large" />
        </div>
      }
    </div>
  );
};

export default loadSubApp({
  name: "Shipping",
  Component,
});
