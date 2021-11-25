import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const handleLogOut = () => {
    sessionStorage.clear();
    history.push("/login");
  };
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/" className="header__leftLink">
            <p>Dorayaki Factory</p>
          </Link>
        </div>

        <div className="header__right">
          <Link to="/dorayaki" className="header__rightLink">
            <p>Dorayaki</p>
          </Link>

          <Link to="/request" className="header__rightLink">
            <p>Requests</p>
          </Link>

          <Link to="/resep" className="header__rightLink">
            <p>Resep</p>
          </Link>

          <Link to="/bahan" className="header__rightLink">
            <p>Bahan</p>
          </Link>
          <Button
            variant="outlined"
            style={{
              borderColor: "rgb(172, 4, 4)",
              color: "rgb(172, 4, 4)",
              marginLeft: "10px",
              height: "25px",
              fontSize: "12px",
            }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
