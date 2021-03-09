import React from "react";
import Timers from "./Timers";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import OutsideAlerter from "./OutsideAlerter";
import logo from "./assets/img/logo-new-start-cookbook-long.png";
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
        <Link to="/" className="btn-link logo-link">
          <img
            className="logo-navbar"
            src={logo}
            alt="New Start Cookbook - Cook with Cheer"
            width="199"
            height="82"
            loading="eager"
          />
        </Link>

        <div className="display-flex">
          <Timers />

          <div className="padleft1"></div>

          <div className="dropdown">
            <button
              className="btn-drop btn-orange rounded"
              onClick={() => dropdownMenu()}
            >
              Menu
            </button>
            <div
              id="profile-dropdown"
              className="dropdown-content bg-muted-dark"
            >
              <OutsideAlerter>
                <div className="padtop2"></div>
                <div className="display-flex justify-center padtop2">
                  <button
                    className="btn-drop btn-orange rounded text-smaller"
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

                <div className="display-flex flex-direction-column align-center justify-center padtop1">
                  <p className="padtop1">
                    <Link to="/" className="light-orange padding1">
                      Home
                    </Link>
                  </p>

                  {isAuthenticated && (
                    <div>
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
                    </div>
                  )}

                  <p className="padtop1">
                    <Link to="/search" className="light-orange padding1">
                      Search
                    </Link>
                  </p>
                </div>
              </OutsideAlerter>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
