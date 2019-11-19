import React, {useState} from "react";
import { Link, Typography, IconButton } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/styles';
import OutlinedFlag from '@material-ui/icons/OutlinedFlag';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownAltOutlined';
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
  subtle: {
    color: "#6d6e71",
  },
  title: {
    display: "inline-block",
    lineHeight: "30px",
    verticalAlign: "middle",
  }
}));

const Component = (props) => {
  const classes = useStyles();
  const [show, setShow ] = useState();
  const { review } = props;
  const { rating, reviewText, reviewTitle } = review;

  return (
    <div className={classes.main}>
      <Rating
        value={rating}
        className={classes.rating}
        readOnly
      />
      <Typography className={classes.title}><strong>{reviewTitle}</strong></Typography>
      <Typography
        variant="subtitle1"
        className={show ? classes.reviewText : classes.reviewTextHidden}
      >
        {reviewText}
      </Typography>
      <Link className={classes.link} onClick={() => setShow(!show)}>See more</Link>
      {props.details &&
        <React.Fragment>
          <Typography className={classes.subtle} variant="subtitle2">
            {review.userNickname}, {new Date(review.reviewSubmissionTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
          {(review.badges || []).find((badge) => badge.id === 'VerifiedPurchaser') &&
            <React.Fragment>
              <Done className={`${classes.subtle} ${classes.title}`} />
              &nbsp;&nbsp;&nbsp;<span className={`${classes.subtle} ${classes.title}`}>Verified Purchaser</span>
            </React.Fragment>
          }
          {review.syndicationSource &&
            <div>
              <img className={classes.title} src={review.syndicationSource.logoImageUrl} style={{maxHeight: 40, maxWidth: 40}} />
              &nbsp;&nbsp;&nbsp;<span className={classes.title}>Written by a customer while visiting <strong>{review.syndicationSource.name}</strong></span>
            </div>
          }
          <div>
            <ThumbUpOutlined className={classes.title} />&nbsp;
            <span className={classes.title}>{review.positiveFeedback}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <ThumbDownOutlined className={classes.title} />&nbsp;
            <span className={classes.title}>{review.negativeFeedback}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <IconButton>
              <OutlinedFlag />
            </IconButton>
          </div>
          {review.clientResponses &&
            review.clientResponses.map((response, index) =>
              <div key={index}>
                <Typography className={classes.subtle} variant="subtitle2">Comment from {response.name || response.department} - {new Date(response.date).toLocaleDateString()}</Typography>
                <Typography variant="caption">{response.response}</Typography>
              </div>
            )
          }
        </React.Fragment>
      }
    </div>
  );
};

export default Component;