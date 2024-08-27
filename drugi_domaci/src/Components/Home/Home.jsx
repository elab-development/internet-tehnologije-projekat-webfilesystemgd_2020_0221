import React from "react";
import "./Home.css";
import Button from "../Button/Button";

function Home({ company, employees }) {
  const addEmployee = () => {
    console.log("Add Employee");
  };
  const addFile = () => {
    console.log("Add File");
  };
  return (
    <div className="home-wrapper">
      <h1 className="company-name">IT svet</h1>
      <p className="employee-count">Number of Employees: 5</p>

      <div className="quick-links">
        <Button handleClick={addEmployee} text={"Add New Employee"} />
        <Button handleClick={addFile} text={"Add New File"} />
      </div>
    </div>
  );
}

export default Home;
