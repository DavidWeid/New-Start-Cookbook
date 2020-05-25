import React from "react";
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
    <nav id="navbar">
      <Link to="/">Cook Book</Link>

      <div className="dropdown">
        <button className="btn-drop" onClick={() => dropdownMenu()}>
          Profile
        </button>
        <div id="profile-dropdown" className="dropdown-content">
          <OutsideAlerter>
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
                <Link to="/create">Create</Link>
                <Link to="/search">Search</Link>
              </div>
            )}
          </OutsideAlerter>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
