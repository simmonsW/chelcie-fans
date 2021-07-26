// Logo, Navigation: About, Log In, Sign Up

import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logoImage from "../../assets/images/logo.svg";

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img id="logo" src={logoImage} style={{ width: "100%" }} alt="ChelcieFans logo" />
        </Link>

        <nav className="text-center nav-items">
            <Link to="/about">About</Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Log Out
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
