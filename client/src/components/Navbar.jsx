import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [navbarClass, setIsNavbarClass] = useState(false);
  const [hamburgerClass, setIsHamburgerClass] = useState(false);

  const { user, authLoader } = useSelector((state) => state.auth);

  const toggleNav = () => {
    setIsHamburgerClass(!hamburgerClass);
    setIsNavbarClass(!navbarClass);
  };

  return !authLoader ? (
    <>
      <nav className="navNav">
        <div className="logo">
          {/* <img src="assets/Logo64x64.png" alt="logo" /> */}
          <h1>LOGO</h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/testimonials">Testimonials</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <div
          className={`hamburger ${hamburgerClass ? "hamburger-active" : ""}`}
          onClick={toggleNav}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
      <div className={`menubar ${navbarClass ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNav}>
              About
            </Link>
          </li>
          <li>
            <Link to="/testimonials" onClick={toggleNav}>
              Testemonials
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={toggleNav}>
              Products
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  ) : null;
};

export default Navbar;
