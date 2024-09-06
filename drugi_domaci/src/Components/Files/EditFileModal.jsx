import React from "react";
import styles from "./EditFileModal.module.css";
import { useState } from "react";

function EditFileModal({ show, onClose, handleEdit, id }) {
  console.log(id);
  const [fileName, setFileName] = useState("");
  if (!show) {
    return null;
  }
  const handleClick = (e) => {
    e.preventDefault();
    handleEdit(fileName, id);
    onClose();
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <h2>Change file name</h2>
        <form>
          <div className={styles.input_box}>
            <label htmlFor="name">File name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
          <button
            onClick={handleClick}
            className={styles.submit_btn}
            type="submit"
          >
            Edit
          </button>
        </form>
        <button className={styles.close_btn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default EditFileModal;
