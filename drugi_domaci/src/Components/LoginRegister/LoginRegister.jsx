import React, { useState } from "react";
import "./LoginRegister.css";
import email_icon from "../Assets/email.png";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [action, setAction] = useState("");
  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };
  let navigate = useNavigate();
  // const [role, setRole] = useState("user");
  return (
    <div className={`wrapper ${action}`}>
      <div className="form-box login">
        <form
          onSubmit={() => {
            navigate("/");
          }}
          action=""
        >
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <img className="icon" src={user_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <img className="icon" src={password_icon} alt="Neka slika" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remeber me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form
          onSubmit={() => {
            navigate("/createCompany");
          }}
          action=""
        >
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <img className="icon" src={user_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <img className="icon" src={email_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <img className="icon" src={password_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm password" required />
            <img className="icon" src={password_icon} alt="Neka slika" />
          </div>

          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Alredy have an account?{" "}
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
