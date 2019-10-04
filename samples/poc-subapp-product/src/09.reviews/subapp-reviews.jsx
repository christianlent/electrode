import React, { useEffect } from "react";
import { connect, Provider } from 'redux-bundler-react'
import { reduxLoadSubApp } from "subapp-redux";
import store from "../components/bundler";
import { Button, Fab, Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import Rating from '@material-ui/lab/Rating';
import { getItemId } from "../components/api";
import { makeImportant } from "../components/global";
import Review from "../components/review";

const useStyles = makeStyles(makeImportant({
  add: {
    backgroundColor: "#0065ff",
    boxShadow: "none",
    color: "white",
    fontFamily: "Bogle",
    height: 40,
    marginLeft: 25,
    marginTop: 30,
    textTransform: "initial",
  },
  see: {
    backgroundColor: "white",
    border: "2px solid black",
    boxShadow: "none",
    color: "black",
    fontFamily: "Bogle-Bold",
    height: 40,
    marginLeft: 25,
    marginTop: 30,
    textTransform: "initial",
  },
  aspect: {
    borderRadius: 0,
    borderColor: "#949499",
    color: "rgba(0, 0, 0, 0.847)",
    fontFamily: "Bogle",
    marginRight: 15,
    marginBottom: 15,
    textTransform: "initial",
  },
  link: {
    marginLeft: 10,
    color: "black",
    textDecoration: "underline",
  },
  main: {
    marginLeft: 15,
    marginTop: 50,
  },
  rating: {
    color: "black"
  },
  ratingCounts: {
    backgroundColor: "#DDDDDD",
    display: "inline-block",
    height: 5,
    marginRight: 10,
    width: 250,
    borderRadius: 10,
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#19a1c4",
      borderRadius: 10,
    }
  },
  ratingCountsText: {
    display: "inline-block",
    width: 70,
  },
  review: {
    borderBottom: "1px solid #e6e7e8",
    paddingBottom: 30,
    maxWidth: 600,
  },
  section: {
    marginTop: 15,
    marginBottom: 7,
  },
  thumb: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

const Component = (props) => {
  const classes = useStyles();
  const { allReviews } = props;
  const id = getItemId();
  const result = allReviews[id];
  useEffect(() => {
    if (result) {
      return;
    }
    props.doFetchReviews(id);
  }, [props.products]);
  if (!result || !Object.keys(result).length) {
    return null;
  }

  //const { productId } = productResult.payload.products[productResult.payload.selected.product];

  const product = Object.values(result.payload.reviews)[0];
  const numberOfReviews = product.totalReviewCount;
  const averageRating = product.averageOverallRating;
  const ratingsByValue = [
    product.ratingValueFiveCount,
    product.ratingValueFourCount,
    product.ratingValueThreeCount,
    product.ratingValueTwoCount,
    product.ratingValueOneCount,
  ];
  return (
    <div className={classes.main}>
      <Typography variant="h5">Customer Reviews</Typography>
      <Typography variant="h3">{product.roundedAverageOverallRating}</Typography>
      <Rating
        value={averageRating}
        className={classes.rating}
        readOnly
      />
      <a className={classes.link} href="#">
        {numberOfReviews} review{numberOfReviews ? "s" : ""}
      </a>
      {
        ratingsByValue.map((count, value) =>
          <div key={value}>
            <span className={classes.ratingCountsText}>
              {5 - value} stars
            </span>
            <LinearProgress
              color="primary" 
              className={classes.ratingCounts}
              variant="determinate"
              value={100 * count / numberOfReviews}
            />
            <span className={classes.ratingCountsText}>
              {count}
            </span>
          </div>
        )
      }
      <Fab variant="extended" className={classes.see}>
        See all reviews
      </Fab>
      <Fab variant="extended" className={classes.add}>
        Write a review
      </Fab>
      {product.aspects &&
        <React.Fragment>
          <Typography className={classes.section}>Top mentions</Typography>
          {product.aspects.map((aspect) =>
            <Button key={aspect.id} variant="outlined" className={classes.aspect}>
              {aspect.name}
              <ThumbUpOutlined className={classes.thumb} />
              {aspect.score}%
            </Button>
          )}
        </React.Fragment>
      }
      {product.topPositiveReview && product.topNegativeReview &&
        <Grid container={true} spacing={2}>
          <Grid item={true} xs={12} sm={6}>
            <Typography className={classes.section}>Most helpful positive review</Typography>
            <Typography variant="caption">{product.topPositiveReview.positiveFeedback} customers found this helpful</Typography>
            <Review review={product.topPositiveReview} />
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Typography className={classes.section}>Most helpful positive review</Typography>
            <Typography variant="caption">{product.topNegativeReview.positiveFeedback} customers found this helpful</Typography>
            <Review review={product.topNegativeReview} />
          </Grid>
        </Grid>
      }
      <Typography>
        {product.pagination.currentSpan} of {product.pagination.total} review{product.pagination.total ? "s" : ""}
      </Typography>
      {product.customerReviews.map((review) =>
        <div className={classes.review} key={review.reviewId}>
          <Review review={review} details={true} />
        </div> 
      )}
    </div>
  );
};

const ConnectedComponent = connect(
  "doFetchReviews",
  "selectAllReviews",
  Component
);

const ProvisionedComponent = () => (
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>
);

export default reduxLoadSubApp({
  name: "Reviews",
  reduxCreateStore: () => store,
  Component: ProvisionedComponent,
});
