import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../globalconfig";
import "./Login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const history = useHistory();

  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    axios
      .post(url + "/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        // if (response.data.message) {
        //   setLoginStatus(response.data.message);
        // } else {
        //   setLoginStatus(response.data.result[0].username);
        // }
        if (response.data.message) {
          alert(response.data.message);
        } else {
          history.push("/dorayaki");
        }
      });
  };

  useEffect(() => {
    axios.get(url + "/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h2>Dorayaki Factory</h2>
        </div>

        <div className="login__form">
          <p>{loginStatus}</p>
          <div className="login__left">
            <p>Username</p>
            <p>Password</p>
          </div>
          <div className="login__right">
            <input
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
