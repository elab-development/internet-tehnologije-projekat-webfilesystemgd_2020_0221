import { useState } from "react";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Company from "./Components/Company/Company.jsx";
import Home from "./Components/Home/Home.jsx";
import Employees from "./Components/Employees/Employees.jsx";

function App() {
  return (
    <BrowserRouter className="container">
      <Routes>
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/createCompany" element={<Company />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
