import React from "react";
import Timers from "./Timers";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import OutsideAlerter from "./OutsideAlerter";
import "./assets/css/navbar.css";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dropdownMenu = () => {
    document.getElementById("profile-dropdown").classList.toggle("show");
  };

  return (
    <nav
      id="navbar"
      className="container-fullwidth container-navbar bg-muted-dark"
    >
      <div className="container display-flex justify-space-between align-center">
        <Timers />

        <Link to="/" className="light-orange text-align-center btn-link">
          New Start Cook Book
        </Link>

        <div className="dropdown">
          <button
            className="btn-drop btn-orange rounded"
            onClick={() => dropdownMenu()}
          >
            Profile
          </button>
          <div id="profile-dropdown" className="dropdown-content bg-muted-dark">
            <OutsideAlerter>
              <div className="padtop2"></div>
              <div className="display-flex justify-center padtop2">
                <button
                  className="btn-drop btn-orange rounded text-small"
                  onClick={() => dropdownMenu()}
                >
                  Close
                </button>
              </div>
              {!isAuthenticated && (
                <div className="display-flex justify-center padtop2">
                  <button
                    className="btn-dark"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </button>
                </div>
              )}

              {isAuthenticated && (
                <div className="display-flex justify-center padtop2">
                  <button className="btn-dark" onClick={() => logout()}>
                    Log out
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <div className="display-flex flex-direction-column align-center justify-center padtop1">
                  <p className="padtop1">
                    <Link to="/" className="light-orange padding1">
                      Home
                    </Link>
                  </p>
                  <p className="padtop1">
                    <Link to="/profile" className="light-orange padding1">
                      Profile
                    </Link>
                  </p>
                  <p className="padtop1">
                    <Link to="/create" className="light-orange padding1">
                      Create
                    </Link>
                  </p>
                  <p className="padtop1">
                    <Link to="/search" className="light-orange padding1">
                      Search
                    </Link>
                  </p>
                </div>
              )}
            </OutsideAlerter>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
