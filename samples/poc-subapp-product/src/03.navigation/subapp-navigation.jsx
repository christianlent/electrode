import React from "react";
import { loadSubApp } from "subapp-pbundle";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { makeImportant } from "../components/global";

const useStyles = makeStyles(makeImportant({
  root: {
    borderBottom: "1px solid #e6e7e8",
    paddingLeft: 5,
    boxShadow: "0 1px 0 0 rgba(0,0,0,.07)",
  },
  tab: {
    fontSize: 12,
    minWidth: 0,
    textTransform: "none",
    color: "black",
    padding: 0,
    fontFamily: "Bogle",
    borderBottom: "4px solid transparent",
    "&:hover": {
      borderBottom: "4px solid #cb2c90",
      boxSizing: "border-box",
      textDecoration: "none",
      color: "black",
    }
  }
}));

const items = [
  { label: "All Things Home", link: "https://www.walmart.com/cp/home/4044?povid=4044+%7C+2018-04-30+%7C+AllThingsHomeNavbar" },
  { label: "Shop by Room", link: "https://www.walmart.com/cp/shop-by-room/7756661?povid=4044+%7C+2018-04-30+%7C+ShopbyRoomNavbar" },
  { label: "Shop by Style", link: "https://www.walmart.com/cp/shop-by-style/9389313?povid=4044+%7C+2018-04-30+%7C+ShopbyStyleNavbar" },
  { label: "Furniture", link: "https://www.walmart.com/cp/furniture/103150?povid=4044+%7C+2018-04-30+%7C+FurnitureNavbar" },
  { label: "Kitchen & Dining", link: "https://www.walmart.com/cp/kitchen-dining/623679?povid=4044+%7C+2018-04-30+%7C+KitchenDiningNavbar" },
  { label: "Appliances", link: "https://www.walmart.com/cp/appliances/90548?povid=4044+%7C+2018-04-30+%7C+AppliancesNavbar" },
  { label: "Bed & Bath", link: "https://www.walmart.com/cp/bed-and-bath/6504106?povid=4044+%7C+2018-04-30+%7C+Bed&BathNavbar" },
  { label: "Patio & Garden", link: "https://www.walmart.com/cp/patio-garden/5428?povid=4044+%7C+2018-04-30+%7C+PatioNavbar" },
  { label: "Home Decor", link: "https://www.walmart.com/cp/decor/133012?povid=4044+%7C+2018-04-30+%7C+HomeD%C3%A9corNavbar" },
  { label: "Storage & Organization", link: "https://www.walmart.com/cp/storage-organization/90828?povid=4044+%7C+2018-04-30+%7C+Storage&OrganizationNavbar" },
  { label: "Home Savings", link: "https://www.walmart.com/browse/home-fall-savings-2019/0/0/?_refineresult=true&_be_shelf_id=1978935&search_sort=100&facet=shelf_id:1978935&povid=4044+%7C+2019-08-30+%7C+HomeSavingsNavBar" },
];

const Component = (props) => {
  const classes = useStyles();
  return (
    <Tabs className={classes.root} variant="fullWidth" value={0} TabIndicatorProps={{style: {display: "none"}}}>
      {items.map((item, index) => 
        <Tab
          className={classes.tab}
          key={index}
          label={item.label}
          component="a"
          href={item.link}
        />
      )}
    </Tabs>
  );
};

export default loadSubApp({
  name: "Navigation",
  Component,
});
