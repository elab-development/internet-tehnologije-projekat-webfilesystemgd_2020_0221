import { useState, useEffect } from "react";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

  const [authToken, setAuthToken] = useState(() => {
    const savedToken = localStorage.getItem("auth_token");
    return savedToken ? savedToken : null;
  });
  const [company, setCompany] = useState(null);
  const [employeesCount, setEmployeesCount] = useState(0);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      fetch(`http://localhost:8000/api/users/${user.id}/company`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCompany(data);
          setEmployeesCount(data.employees.length);
        })
        .catch((error) => console.error("Error fetching company:", error));
    }
  }, [user]);

  // useEffect(() => {
  //   if (company) {
  //     fetch(`http://localhost:8000/employees?company_id=${company.id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setEmployeesCount(data.length);
  //       })
  //       .catch((error) => console.error("Error fetching employees:", error));
  //   }
  // }, [company]);

  return (
    <BrowserRouter className="container">
      <Routes>
        <Route
          path="/loginRegister"
          element={
            <LoginRegister setUser={setUser} setAuthToken={setAuthToken} />
          }
        />
        <Route
          path="/createCompany"
          element={<Company user={user} setCompany={setCompany} />}
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
