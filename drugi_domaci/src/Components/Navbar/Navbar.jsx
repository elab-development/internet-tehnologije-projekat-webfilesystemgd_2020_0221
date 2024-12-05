import "./Navbar.css";
import React from "react";
import logo_b from "../Assets/Miles_F.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("employee");
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
          <li>
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </li>
        </ul>
        <CiLogout className="logout" onClick={handleLogout} />
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
