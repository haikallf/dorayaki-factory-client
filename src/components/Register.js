import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "../globalconfig";
import "./Register.css";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  axios.defaults.withCredentials = true;

  const handleRegister = () => {
    axios
      .post(url + "/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          alert(response.data.message);
        } else {
          alert(response.data.success);
          history.push("/login");
        }
      });
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__title">
          <h2>Dorayaki Factory</h2>
        </div>

        <div className="register__form">
          <div className="register__left">
            <p>Username</p>
            <p>Password</p>
            <p>Email</p>
          </div>
          <div className="register__right">
            <input
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
