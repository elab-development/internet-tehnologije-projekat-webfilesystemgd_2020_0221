import React, { useState } from "react";
import "./LoginRegister.css";
import email_icon from "../Assets/email.png";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";

function LoginRegister() {
  const [action, setAction] = useState("Sign Up");
  const [role, setRole] = useState("user");
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>

        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Confirm password" />
          </div>
        )}
      </div>
      {action === "Login" ? (
        <div className="forgot-password">
          Forgot password? <span>Click Here!</span>
        </div>
      ) : (
        <div></div>
      )}

      {action === "Login" && (
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="employee"
              checked={role === "employee"}
              onChange={() => setRole("employee")}
            />
            Employee
          </label>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "submit" : "submit gray"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Login" ? "submit" : "submit gray"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
