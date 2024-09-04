import React, { useState } from "react";
import "./LoginRegister.css";
import email_icon from "../Assets/email.png";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";

function LoginRegister({ setUser }) {
  const [action, setAction] = useState("");
  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };
  let navigate = useNavigate();
  // const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmployee, setIsEmployee] = useState(false);
  const handleChcckBoxChange = (e) => {
    setIsEmployee(e.target.checked);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = isEmployee
        ? await fetch("http://localhost:8000/employees")
        : await fetch("http://localhost:8000/users");
      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        alert("User successfully created");
        const data = await response.json();
        setUser(data);
        navigate("/createCompany");
      } else {
        alert("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className={`wrapper ${action}`}>
      <div className="form-box login">
        <form onSubmit={handleSubmitLogin} action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <img className="icon" src={email_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img className="icon" src={password_icon} alt="Neka slika" />
          </div>
          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={isEmployee}
                onChange={handleChcckBoxChange}
              />
              Login as employee
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
        <form onSubmit={handleSubmitRegister} action="">
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <img className="icon" src={user_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <img className="icon" src={email_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img className="icon" src={password_icon} alt="Neka slika" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
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
