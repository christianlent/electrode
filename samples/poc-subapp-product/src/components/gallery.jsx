import React, { useState } from "react";
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  img: {
    height: "100%",
    width: "auto"
  },
  primaryImage: {
    width: "100%",
  },
  gallery: {
    maxHeight: "50%",
    maxWidth: "35%",
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: 1,
  },
});

export default (props) => {
  const classes = useStyles();
  const [mainImageId, setMainImageId] = useState();
  const [hoverImageId, setHoverImageId] = useState();

  const { result } = props;
  const product = result.payload.products[result.payload.selected.product];
  const imageLookup = result.payload.images;
  const images = product.images.map((imageId) => {
    return imageLookup[imageId];
  });
  const primaryImage = images.find((image) => image.type === "PRIMARY");
  const mainImage = imageLookup[hoverImageId || mainImageId || (primaryImage ? primaryImage.assetId : 0)];
  return (
    <div className={classes.gallery}>
      {mainImage && <img
        src={mainImage.assetSizeUrls.DEFAULT}
        className={classes.primaryImage}
      />}
      <GridList className={classes.gridList} cols={2.5}>
        {images.map((image) => (
          <GridListTile key={image.assetId} style={{ width: "auto" }}>
            <img
              src={image.assetSizeUrls.DEFAULT}
              className={classes.img}
              onMouseOver={() => setHoverImageId(image.assetId)}
              onClick={() => setMainImageId(image.assetId)}
              onMouseOut={() => setHoverImageId(undefined)}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
