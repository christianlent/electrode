import React, {useState} from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import logo from "./logo.svg";

const NavItem = props => {
  const { to, exact, strict, children } = props;
  return (
    <Route
      path={to}
      exact={exact}
      strict={strict}
      children={({ location, match }) => {
        const cn = match ? "active" : null;
        if (to.indexOf("http") === 0) {
          return (
            <li className={cn}>
              <a href={to}>
                <div>{children}</div>
              </a>
            </li>
          );
        }

        return (
          <li className={cn}>
            <Link to={to}>
              <div>{children}</div>
            </Link>
          </li>
        );
      }}
    />
  );
};

const Navigation = () => {
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
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <img src={logo} />
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <NavItem to="https://www.walmart.com/all-departments">
              <span className="glyphicon glyphicon-menu-hamburger" />
            </NavItem>
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={handleSearch}
            />
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <NavItem to="https://grocery.walmart.com">
              <span className="glyphicon glyphicon-cutlery" />
            </NavItem>
            <NavItem to="https://www.walmart.com/accountlogo">
              <span className="glyphicon glyphicon-user" />
            </NavItem>
            <NavItem to="https://www.walmart.com/store/finder">
              <span className="glyphicon glyphicon-map-marker" />
            </NavItem>
            <NavItem to="https://www.walmart.com/cart">
              <span className="glyphicon glyphicon-shopping-cart" />
            </NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const RouterNavigation = withRouter(Navigation);

export { RouterNavigation as Navigation };
