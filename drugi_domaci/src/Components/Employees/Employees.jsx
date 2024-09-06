import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./Employees.css";

function Employees({ company, setEmployeesCount }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (company?.id) {
      fetch(`http://localhost:8000/employees?company_id=${company.id}`)
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
    fetch(`http://localhost:8000/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position: position }),
    })
      .then(() => {
        return fetch(
          `http://localhost:8000/employees?company_id=${company.id}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8000/employees/${id}`, {
      method: "DELETE",
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
