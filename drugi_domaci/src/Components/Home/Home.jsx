import React from "react";
import "./Home.css";
import Button from "../Button/Button";

function Home({ company }) {
  const addEmployee = () => {
    console.log("Add Employee");
  };
  const addFile = () => {
    console.log("Add File");
  };

  // const data = fetch("http://localhost:8000/companies").then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Server error");
  //   }
  //   response
  //     .json()
  //     .then((data) => {
  //       return data.find((company) => company.user_id === user.id);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });
  return (
    <div className="home-wrapper">
      <h1 className="company-name">{company && company.name}</h1>
      <p className="employee-count">Number of Employees: 5</p>

      <div className="quick-links">
        <Button handleClick={addEmployee} text={"Add New Employee"} />
        <Button handleClick={addFile} text={"Add New File"} />
      </div>
    </div>
  );
}

export default Home;
