import Button from "../Button/Button";
import "./Employee.css";

function Employee({ employee }) {
  const handleEdit = () => {
    console.log("Edit");
  };
  const handleRemove = () => {
    console.log("Remove");
  };
  return (
    <div className="employee-card">
      <div className="employee-information">
        <div className="employee-line">
          <h1>Ime i prezime:</h1>
          <h1>{employee.name}</h1>
        </div>
        <div className="employee-line">
          <span>Email: </span>
          <p>{employee.email}</p>
        </div>
        <div className="employee-line">
          <span>Radno mesto: </span>
          <p>{employee.position}</p>
        </div>
      </div>

      <div className="employee-buttons">
        <Button text="Edit Position" handleClick={handleEdit} />
        <Button text="Remove" handleClick={handleRemove} />
      </div>
    </div>
  );
}

export default Employee;
