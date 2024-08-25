import { useState } from "react";
import Employee from "./Employee";

function Employees() {
  const employeesData = [
    {
      name: "Pera Peric",
      position: "Cleaning Crew Team Lead",
      email: "pperic@email.com",
    },
    {
      name: "Mika Mikic",
      position: "Senior Coffee Provider",
      email: "mmikic@email.com",
    },
    {
      name: "Zika Zikic",
      position: "Scrum Slave",
      email: "zzikic@email.com",
    },
  ];
  const [employees, setEmployees] = useState(employeesData);
  console.log("test");
  return (
    <div className="employees-container">
      {employees.map((element) => (
        <Employee employee={element}></Employee>
      ))}
    </div>
  );
}

export default Employees;
