import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./Employees.css";

function Employees({ company, setEmployeesCount }) {
  const [employees, setEmployees] = useState(company?.employees);

  useEffect(() => {
    if (company?.id) {
      fetch(`http://localhost:8000/api/companies/${company.id}/employees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Server error");
          }
          return response.json();
        })
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [company]);

  const handleEdit = (position, id) => {
    if (!position) return;
    fetch(`http://localhost:8000/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ position: position, company_id: company.id }),
    })
      .then(() => {
        return fetch(
          `http://localhost:8000/api/companies/${company.id}/employees`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8000/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    }).then(() => {
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
      setEmployeesCount(newEmployees.length);
    });
  };
  return (
    <div className="employees-container">
      {employees &&
        employees.map((element) => (
          <Employee
            key={element.id}
            employee={element}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        ))}
    </div>
  );
}
export default Employees;
