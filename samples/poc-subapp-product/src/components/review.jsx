import React, {useState} from "react";
import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Rating from '@material-ui/lab/Rating';
import { makeImportant } from "../components/global";

const useStyles = makeStyles(makeImportant({
  link: {
    color: "black",
    textAlign: "center",
    textDecoration: "underline",
    width: "100%",
    marginTop: 5,
    display: "inline-block",
    cursor: "pointer",
  },
  main: {
    marginTop: 15,
  },
  rating: {
    color: "black",
    lineHeight: "30px",
    marginRight: 15,
    verticalAlign: "middle",
  },
  reviewText: {
    fontFamily: "Bogle",
    maxHeight: 600,
    overflow: "hidden",
    transition: "max-height 4.0s ease-out",
  },
  reviewTextHidden: {
    fontFamily: "Bogle",
    maxHeight: 100,
    overflow: "hidden",
    position: "relative",
    "&:before": {
      content: '""',
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
      background: "linear-gradient(transparent 10px, white)",
    },
  },
  title: {
    display: "inline-block",
    lineHeight: "30px",
    verticalAlign: "middle",
    fontFamily: "Bogle-Bold",
  }
}));

const Component = (props) => {
  const classes = useStyles();
  const [show, setShow ] = useState();
  const { rating, reviewText, reviewTitle } = props.review;

  return (
    <div className={classes.main}>
      <Rating
        value={rating}
        className={classes.rating}
        readOnly
      />
      <Typography className={classes.title}>{reviewTitle}</Typography>
      <Typography
        variant="subtitle1"
        className={show ? classes.reviewText : classes.reviewTextHidden}
      >
        {reviewText}
      </Typography>
      <Link className={classes.link} onClick={() => setShow(!show)}>See more</Link>
    </div>
  );
};

export default Component;