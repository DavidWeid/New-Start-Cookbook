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
    <nav id="navbar" className="container-fullwidth--muted-dark">
      <div className="container-navbar">
        <Timers />

        <Link to="/" className="light">
          Cook Book
        </Link>

        <div className="dropdown">
          <button className="btn-drop" onClick={() => dropdownMenu()}>
            Profile
          </button>
          <div id="profile-dropdown" className="dropdown-content">
            <OutsideAlerter>
              {!isAuthenticated && (
                <div className="dropdown-container">
                  <button onClick={() => loginWithRedirect({})}>Log in</button>
                </div>
              )}

              {isAuthenticated && (
                <div className="dropdown-container">
                  <button onClick={() => logout()}>Log out</button>
                </div>
              )}
              {isAuthenticated && (
                <div className="dropdown-container nav-links bg-muted-dark">
                  <Link to="/" className="light">
                    Home
                  </Link>
                  <Link to="/profile" className="light">
                    Profile
                  </Link>
                  <Link to="/create" className="light">
                    Create
                  </Link>
                  <Link to="/search" className="light">
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
