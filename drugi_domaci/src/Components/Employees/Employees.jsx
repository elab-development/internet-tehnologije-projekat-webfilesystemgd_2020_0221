import { useEffect, useState } from "react";
import Employee from "./Employee";
import "./Employees.css";

function Employees() {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/employees").then((response) => {
      if (!response.ok) {
        throw new Error("Server error");
      }
      response
        .json()
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  const handleEdit = (position, id) => {
    if (!position) return;
    fetch(`http://localhost:8000/employees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position: position }),
    })
      .then(() => {
        return fetch("http://localhost:8000/employees");
      })
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        // Update your state or UI with the fetched employees data
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8000/employees/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newEmployees = employees.filter((employee) => employee.id !== id);
      setEmployees(newEmployees);
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
