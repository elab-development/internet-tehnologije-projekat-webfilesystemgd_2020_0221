import "./Navbar.css";
import React from "react";
import search_w from "../Assets/search-w.png";
import logo_b from "../Assets/logo-black.png";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/loginRegister");
  };
  return (
    <div>
      <div className="navbar">
        <img src={logo_b} alt="" className="logo" />
        <ul>
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/employees" className="navbar-link">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/files" className="navbar-link">
              Files
            </Link>
          </li>
          <li>Profile</li>
        </ul>
        <div className="search-box">
          <input type="text" placeholder="Serach" />
          <img src={search_w} alt="" />
        </div>
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
