import { React, useState, useEffect } from "react";
import styles from "./AddPrivilegeModal.module.css";

function AddPrivilegeModal({ show, onClose, company, file_id, handleAdd }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPrivilege, setSelectedPrivilege] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (!company) {
      return;
    }
    fetch(`http://localhost:8000/employees?company_id=${company.id}`).then(
      (response) => {
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
      }
    );
  }, []);
  if (!show) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedPrivilege) {
      setErrorMessage("Please select an employee and privilege");
      return;
    }
    let can_view = selectedPrivilege === "can_view";
    const can_edit = selectedPrivilege === "can_edit";

    if (can_edit && !can_view) {
      can_view = true;
    }

    handleAdd(selectedEmployee, file_id, can_view, can_edit);
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Add privilege</h2>
        <form>
          <div className={styles.input_box}>
            <label htmlFor="employee-select">Select an Employee:</label>
            <select
              id="employee-select"
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                setErrorMessage("");
              }}
            >
              <option value="">--Choose an employee--</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <label htmlFor="privilege-select">Select privilege:</label>
            <select
              id="privilege-select"
              value={selectedPrivilege}
              onChange={(e) => {
                setSelectedPrivilege(e.target.value);
                setErrorMessage("");
              }}
            >
              <option value="">--Choose privilege--</option>
              <option value="can_view">Can view</option>
              <option value="can_edit">Can edit</option>
            </select>
          </div>
          {errorMessage && (
            <p className={styles.error_message}>{errorMessage}</p>
          )}
          <button
            onClick={handleClick}
            className={styles.submit_btn}
            type="submit"
          >
            Add
          </button>
        </form>
        <button className={styles.close_btn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AddPrivilegeModal;
