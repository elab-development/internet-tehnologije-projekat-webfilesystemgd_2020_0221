import { React, useState } from "react";
import "./Home.css";
import Button from "../Button/Button";
import AddEmployeeModal from "../Employees/AddEmployeeModal";

function Home({ company, employeesCount, setEmployeesCount, user_id }) {
  const addEmployee = ({ name, position, email, password, gender }) => {
    fetch("http://localhost:8000/api/employees", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        position: position,
        email: email,
        password: password,
        gender: gender,
        // company_id: company_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setEmployeesCount(employeesCount + 1);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [showModalEmployee, setShowModalEmployee] = useState(false);

  const toggleModalEmployee = () => {
    setShowModalEmployee(!showModalEmployee);
  };

  return (
    <div className="home-wrapper">
      <h1 className="company-name">{company && company.name}</h1>
      <p className="employee-count">Number of Employees: {employeesCount}</p>

      <div className="quick-links">
        <Button handleClick={toggleModalEmployee} text={"Add New Employee"} />
      </div>
      <AddEmployeeModal
        show={showModalEmployee}
        onClose={toggleModalEmployee}
        handleAdd={addEmployee}
      />
    </div>
  );
}
export default Home;
