import React from "react";
import "./Login.css";
function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">
          <h2>Dorayaki Factory</h2>
        </div>

        <div className="login__form">
          <div className="login__left">
            <p>Username</p>
            <p>Password</p>
          </div>
          <form action="POST" className="login__right">
            <input type="text" name="username" />
            <input type="text" name="password" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
