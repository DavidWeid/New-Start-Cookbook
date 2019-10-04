import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import DetectOutside from "./OutsideClick";
import "./CSS/navbar.css";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const dropdownMenu = () => {
    document.getElementById("profile-dropdown").classList.toggle("show");
  };

  return (
    <nav id="navbar">
      <button>Timers</button>

      <span>Cook Book</span>

      <div className="dropdown">
        <button className="btn-drop" onClick={() => dropdownMenu()}>
          Profile
        </button>
        <div id="profile-dropdown" className="dropdown-content">
          <DetectOutside>
            {!isAuthenticated && (
              <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && (
              <button onClick={() => logout()}>Log out</button>
            )}
            {isAuthenticated && (
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
              </div>
            )}
          </DetectOutside>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
