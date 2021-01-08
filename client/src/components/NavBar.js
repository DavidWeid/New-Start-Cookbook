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
            className="btn-drop btn-orange"
            onClick={() => dropdownMenu()}
          >
            Profile
          </button>
          <div id="profile-dropdown" className="dropdown-content bg-muted-dark">
            <OutsideAlerter>
              {!isAuthenticated && (
                <div className="display-flex">
                  <button
                    className="btn-dark padtop1 padbot1"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </button>
                </div>
              )}

              {isAuthenticated && (
                <div className="display-flex">
                  <button
                    className="btn-dark padtop1 padbot1"
                    onClick={() => logout()}
                  >
                    Log out
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <div className="display-flex display-flex flex-direction-column align-center">
                  <Link to="/" className="light-orange padtop1 padbot1">
                    Home
                  </Link>
                  <Link to="/profile" className="light-orange padtop1 padbot1">
                    Profile
                  </Link>
                  <Link to="/create" className="light-orange padtop1 padbot1">
                    Create
                  </Link>
                  <Link to="/search" className="light-orange padtop1 padbot1">
                    Search
                  </Link>
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
