import React, { useEffect } from "react";
import $ from "jquery";
import { EncryptStorage } from "encrypt-storage";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSearch } from "@fortawesome/free-solid-svg-icons";

//css
import "./navbar.css";

const Navbar = () => {
  const encryptStorage = new EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const location = useLocation();

  const handleClickLogout = () => {
    encryptStorage.clear();
  };

  const handleScroll = () => {
    let scrollPos = document.documentElement.scrollTop;

    if (scrollPos > 0) {
      $("nav").addClass("scrolled");
    } else {
      $("nav").removeClass("scrolled");
    }
  };

  const toggleHamburgerMenu = () => {
    if ($("nav").hasClass("hamburger")) {
      $("nav").removeClass("hamburger");
    } else {
      $("nav").addClass("hamburger");
    }
  };

  useEffect(() => {
    $("nav").addClass("scrolled");
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <nav>
      <div className="nav-blur" onClick={() => toggleHamburgerMenu()}></div>
      <div className="hamburger-menu" onClick={() => toggleHamburgerMenu()}>
        <div className="hamburger-menu-icon">
          <div className="hamburger-menu-icon-middle"></div>
        </div>
      </div>
      <div className="logo-mobile">
        {encryptStorage.getItem("admin_logged_in") ||
        encryptStorage.getItem("manager_logged_in") ? (
          <img src="/assets/images/logo.svg" alt="logo" />
        ) : (
          <NavLink exact to="/">
            <img src="/assets/images/logo.svg" alt="logo" />
          </NavLink>
        )}
      </div>
      <div className="nav-items">
        <ul className="navbar-item-left">
          <li className="logo">
            {encryptStorage.getItem("admin_logged_in") ||
            encryptStorage.getItem("manager_logged_in") ? (
              <img src="/assets/images/logo.svg" alt="logo" />
            ) : (
              <NavLink exact to="/">
                <img src="/assets/images/logo.svg" alt="logo" />
              </NavLink>
            )}
          </li>

          {/*INI UNTUK NAVBAR ADMIN */}
          {encryptStorage.getItem("admin_logged_in") ? (
            <>
              <ul className="navbar-user-control">
                <li
                  style={{
                    listStyle: "none",
                    minWidth: "auto",
                    paddingLeft: "2em",
                  }}
                >
                  <span>Masters</span>
                  <ul>
                    <li>
                      <NavLink
                        exact
                        to="/masterbrand"
                        activeClassName="navbar-active"
                        className="navlink-left"
                      >
                        master brand
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to="/mastercategory"
                        activeClassName="navbar-active"
                        className="navlink-left"
                      >
                        master category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to="/mastermember"
                        activeClassName="navbar-active"
                        className="navlink-left"
                      >
                        master member
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to="/masterpromo"
                        activeClassName="navbar-active"
                        className="navlink-left"
                      >
                        master promo
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to="/masterstock"
                        activeClassName="navbar-active"
                        className="navlink-left"
                      >
                        master stock
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

              <li>
                <NavLink
                  exact
                  to="/confirmorder"
                  activeClassName="navbar-active"
                >
                  confirm order
                </NavLink>
              </li>
            </>
          ) : encryptStorage.getItem("manager_logged_in") ? (
            <>
              <li>
                <NavLink
                  exact
                  to="/masteremployee"
                  activeClassName="navbar-active"
                >
                  employee
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/pricing" activeClassName="navbar-active">
                  report
                </NavLink>
              </li>
            </>
          ) : encryptStorage.getItem("manager_logged_in") ? (
            <>
              <li>
                <NavLink exact to="/profile" activeClassName="navbar-active">
                  profile
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/pricing" activeClassName="navbar-active">
                  report
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink exact to="/" activeClassName="navbar-active">
                  home
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/shop" activeClassName="navbar-active">
                  shop now
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-item-middle">
          <li>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Here"
                className="search-nav"
              />
              <FontAwesomeIcon
                icon={faSearch}
                style={{
                  fontSize: "1.2em",
                  color: "white",
                  marginLeft: "1em",
                  cursor: "pointer",
                }}
                className="nav-icon-search"
              />
            </div>
          </li>
        </ul>
        {encryptStorage.getItem("user_logged_in") ? (
          <ul className="navbar-user-control">
            <li>
              <span>
                hello, {encryptStorage.getItem("user_logged_in").customer.nama}
              </span>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/subscription"
                    activeClassName="navbar-active"
                  >
                    subscription
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/logout"
                    activeClassName="navbar-active"
                    onClick={() => handleClickLogout()}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : encryptStorage.getItem("admin_logged_in") ? (
          <ul className="navbar-user-control">
            <li>
              <span>Hello, admin</span>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/logout"
                    activeClassName="navbar-active"
                    onClick={() => handleClickLogout()}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : encryptStorage.getItem("manager_logged_in") ? (
          <ul className="navbar-user-control">
            <li>
              <span>Hello, manager</span>
              <ul>
                <li>
                  <NavLink
                    exact
                    to="/logout"
                    activeClassName="navbar-active"
                    onClick={() => handleClickLogout()}
                  >
                    logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul className="navbar-item-right">
            <li>
              <NavLink exact to="/register" activeClassName="navbar-active">
                sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/login"
                activeClassName="navbar-active"
                className="navbar-button"
              >
                sign in
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-slider"></div>
    </nav>
  );
};

export default Navbar;
