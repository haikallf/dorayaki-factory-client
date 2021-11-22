import React from "react";
import "./Header.css";
import { Router, Route, Switch } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <p>Dorayaki Factory</p>
        </div>

        <div className="header__right">
          <p>Requests</p>
          <p>Resep</p>
          <p>Bahan</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
