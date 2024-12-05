import Button from "../Button/Button";
import "./Employee.css";
import EditModal from "./EditModal";
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { SiWorkplace } from "react-icons/si";
import { MdEmail, MdDelete, MdModeEdit } from "react-icons/md";

function Employee({ employee, handleRemove, handleEdit }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="employee-card">
      <div className="employee-information">
        <div className="employee-line">
          <h1>
            <BsFillPersonFill />
          </h1>
          <h1> {employee.name}</h1>
        </div>
        <div className="employee-line">
          <span>
            <MdEmail />
          </span>
          <p>{employee.email}</p>
        </div>
        <div className="employee-line">
          <span>
            <SiWorkplace />{" "}
          </span>
          <p>{employee.position}</p>
        </div>
      </div>

      <div className="employee-buttons">
        <Button text={<MdModeEdit />} handleClick={toggleModal} />
        <Button
          text={<MdDelete />}
          handleClick={() => handleRemove(employee?.id)}
        />
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
