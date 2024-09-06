import { React, useState } from "react";
import "./Home.css";
import Button from "../Button/Button";
import AddEmployeeModal from "../Employees/AddEmployeeModal";
import AddFileModal from "../Files/AddFileModal";

function Home({ company, employeesCount, setEmployeesCount, user_id }) {
  const company_id = company?.id;

  const addEmployee = ({
    name,
    position,
    email,
    password,
    gender,
    company_id,
  }) => {
    fetch("http://localhost:8000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        position: position,
        email: email,
        passowrd: password,
        gender: gender,
        company_id: company_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setEmployeesCount(employeesCount + 1);
  };
  const addFile = ({ name, mime_type, size, path, user_id }) => {
    fetch("http://localhost:8000/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mime_type: mime_type,
        size: size,
        path: path,
        user_id: user_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [showModalEmployee, setShowModalEmployee] = useState(false);

  const toggleModalEmployee = () => {
    setShowModalEmployee(!showModalEmployee);
  };

  const [showModalFile, setShowModalFile] = useState(false);
  const toggleModalFile = () => {
    setShowModalFile(!showModalFile);
  };

  return (
    <div className="home-wrapper">
      <h1 className="company-name">{company && company.name}</h1>
      <p className="employee-count">Number of Employees: {employeesCount}</p>

      <div className="quick-links">
        <Button handleClick={toggleModalEmployee} text={"Add New Employee"} />
        <Button handleClick={toggleModalFile} text={"Add New File"} />
      </div>
      <AddEmployeeModal
        show={showModalEmployee}
        onClose={toggleModalEmployee}
        handleAdd={addEmployee}
        company_id={company_id}
      />

      <AddFileModal
        show={showModalFile}
        onClose={toggleModalFile}
        handleAdd={addFile}
        user_id={user_id}
      />
    </div>
  );
}
export default Home;
