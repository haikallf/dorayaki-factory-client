import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/" className="header__leftLink">
            <p>Dorayaki Factory</p>
          </Link>
        </div>

        <div className="header__right">
          <Link to="/request" className="header__rightLink">
            <p>Requests</p>
          </Link>

          <Link to="/resep" className="header__rightLink">
            <p>Resep</p>
          </Link>

          <Link to="/bahan" className="header__rightLink">
            <p>Bahan</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
