import { React, useState } from "react";
import "./Home.css";
import Button from "../Button/Button";
import AddEmployeeModal from "../Employees/AddEmployeeModal";

function Home({ company, employeesCount, setEmployeesCount }) {
  const company_id = company?.id;
  const addEmployee = ({ name, position, email, password, company_id }) => {
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
  const addFile = () => {
    console.log("Add File");
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="home-wrapper">
      <h1 className="company-name">{company && company.name}</h1>
      <p className="employee-count">Number of Employees: {employeesCount}</p>

      <div className="quick-links">
        <Button handleClick={toggleModal} text={"Add New Employee"} />
        <Button handleClick={addFile} text={"Add New File"} />
      </div>
      <AddEmployeeModal
        show={showModal}
        onClose={toggleModal}
        handleAdd={addEmployee}
        company_id={company_id}
      />
    </div>
  );
}
export default Home;
