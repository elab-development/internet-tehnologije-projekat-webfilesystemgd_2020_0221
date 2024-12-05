import React, { useState } from "react";
import "./LoginRegister.css";
import email_icon from "../Assets/email.png";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { useNavigate, Link } from "react-router-dom";

function LoginRegister({ setUser, setAuthToken }) {
  const [action, setAction] = useState("");
  const registerLink = () => {
    setAction("active");
  };
  const loginLink = () => {
    setAction("");
  };
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [token, setToken] = useState(null);

  const [isEmployee, setIsEmployee] = useState(false);
  const handleChcckBoxChange = (e) => {
    setIsEmployee(e.target.checked);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = isEmployee
        ? await fetch("http://localhost:8000/employee/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
        : await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong.");
      }
      const data = await response.json();

      isEmployee ? setUser(data.employee) : setUser(data.user);
      localStorage.setItem("auth_token", data.access_token);
      setAuthToken(data.access_token);
      navigate("/");
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
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, gender }),
      });
      if (response.ok) {
        alert("User successfully created");
        const data = await response.json();
        console.log(data);
        setUser(data.user);
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
            <Link to="/forgotPassword">Forgot password?</Link>
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
          <div className="gender-selection">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
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
