import Button from "../Button/Button";
import "./Employee.css";
import EditModal from "./EditModal";
import { useState } from "react";

function Employee({ employee, handleRemove, handleEdit }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
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
        <Button text="Edit Position" handleClick={toggleModal} />
        <Button text="Remove" handleClick={() => handleRemove(employee.id)} />
      </div>
      <EditModal
        show={showModal}
        onClose={toggleModal}
        handleEdit={handleEdit}
        id={employee.id}
      />
    </div>
  );
}

export default Employee;
