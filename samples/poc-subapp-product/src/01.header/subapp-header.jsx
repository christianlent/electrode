// @subapp@ {name: "Header"}
import React from "react";
import { getBrowserHistory } from "subapp-web";
import { loadSubApp } from "subapp-web";
import { Navigation } from "../components/navigation";
import { Router } from "react-router-dom";

const Header = () => {
  return (
    <Router history={getBrowserHistory()}>
      <Navigation />
    </Router>
  );
};

export default loadSubApp({ name: "Header", Component: Header });
