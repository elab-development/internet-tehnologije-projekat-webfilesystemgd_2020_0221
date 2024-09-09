import { useState, useEffect } from "react";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Navbar from "./Components/Navbar/Navbar.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Company from "./Components/Company/Company.jsx";
import Home from "./Components/Home/Home.jsx";
import Employees from "./Components/Employees/Employees.jsx";
import Files from "./Components/Files/Files.jsx";
import Profile from "./Components/Profile/Profile.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [company, setCompany] = useState(null);
  const [employeesCount, setEmployeesCount] = useState(0);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); //kad se refresuje stranica, user ostaje ulogovan

      fetch(`http://localhost:8000/companies?user_id=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setCompany(data[0]);
          }
        })
        .catch((error) => console.error("Error fetching company:", error));
    }
  }, [user]);

  useEffect(() => {
    if (company) {
      fetch(`http://localhost:8000/employees?company_id=${company.id}`)
        .then((response) => response.json())
        .then((data) => {
          setEmployeesCount(data.length);
        })
        .catch((error) => console.error("Error fetching employees:", error));
    }
  }, [company]);

  return (
    <BrowserRouter className="container">
      <Routes>
        <Route
          path="/loginRegister"
          element={<LoginRegister setUser={setUser} />}
        />

        {user ? (
          <Route path="/" element={<Navbar />}>
            <Route
              path="/"
              element={
                <Home
                  company={company}
                  employeesCount={employeesCount}
                  setEmployeesCount={setEmployeesCount}
                  user_id={user?.id}
                />
              }
            />
            <Route
              path="/employees"
              element={
                <Employees
                  company={company}
                  setEmployeesCount={setEmployeesCount}
                />
              }
            />
            <Route
              path="/files"
              element={<Files user={user} company={company} />}
            />
            <Route
              path="/createCompany"
              element={<Company user={user} setCompany={setCompany} />}
            />
            <Route path="/profile" element={<Profile user={user} />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/loginRegister" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
