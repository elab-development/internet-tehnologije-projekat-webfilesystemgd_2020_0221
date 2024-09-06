import React from "react";
import styles from "./AddEmployeeModal.module.css";
import { useState } from "react";

function AddEmployeeModal({ show, onClose, handleAdd, company_id }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  if (!show) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleAdd({ name, position, email, password, gender, company_id });
    onClose();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Add employee</h2>
        <form onSubmit={handleClick}>
          <div className={styles.input_box}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name">Position:</label>
            <input
              type="text"
              id="position"
              name="name"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              id="email"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="name">Password:</label>
            <input
              type="text"
              id="password"
              name="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.radio}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>
          <button className={styles.submit_btn} type="submit">
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

export default AddEmployeeModal;
