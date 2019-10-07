// @subapp@ {name: "Header"}
import React, {useState} from "react";
import { loadSubApp } from "subapp-web";
import logo from "../components/logo.svg";
import Menu from '@material-ui/icons/Menu';
import FastFoodOutlined from '@material-ui/icons/FastFoodOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import PersonPin from '@material-ui/icons/PersonPin';
import Search from '@material-ui/icons/Search';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import { AppBar, IconButton, InputAdornment, TextField } from '@material-ui/core';

const Component = () => {
  const [search, setSearch] = useState(0);
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  function handleSearch() {
    if (!search) {
      return;
    }
    window.location = `https://www.walmart.com/search/?cat_id=0&query=${search}`;
  }
  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    handleSearch();
  }
  return (
    <React.Fragment>
      <AppBar position="fixed" style={{
        backgroundColor: "#041e42",
        boxShadow: "none",
        display: "block",
        height: 44,
      }}>
        <IconButton style={{margin: "6px 15px"}}>
          <img src={logo} style={{height: 32}} />
        </IconButton>
        <IconButton style={{marginLeft: 8}}>
          <Menu style={{color: "#3ec5e6"}} />
        </IconButton>
        <TextField
          placeholder="Search"
          hiddenLabel
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSearch}
          style={{backgroundColor: "white", marginLeft: 125, marginTop: 2, width: 300}}
          InputProps={{
            style: {marginLeft: 5, height: 40, "::placeholder": {color: "black"}},
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <div style={{float: "right"}}>
          <a href="https://grocery.walmart.com" style={{display: "inline-block", lineHeight: "44px", marginRight: 25}}>
            <FastFoodOutlined style={{color: "white", verticalAlign: "middle"}} />
          </a>
          <a href="https://www.walmart.com/accountlogo" style={{display: "inline-block", lineHeight: "44px", marginRight: 25}}>
            <PermIdentityOutlined style={{color: "white", verticalAlign: "middle"}} />
          </a>
          <a href="https://www.walmart.com/store/finder" style={{display: "inline-block", lineHeight: "44px", marginRight: 25}}>
            <PersonPin style={{color: "white", verticalAlign: "middle"}} />
          </a>
          <a href="https://www.walmart.com/cart" style={{display: "inline-block", lineHeight: "44px", marginRight: 25}}>
            <ShoppingCartOutlined style={{color: "white", verticalAlign: "middle"}} />
          </a>
        </div>
      </AppBar>
      <div style={{height: 44}}>&nbpsp;</div>
    </React.Fragment>
  );
};

export default loadSubApp({ name: "Header", Component });
