import React from "react";
import styles from "./AddFileModal.module.css";
import { useState } from "react";

function AddFileModal({ show, onClose, handleAdd, user_id }) {
  const [name, setName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [size, setSize] = useState("");
  const [path, setPath] = useState("");
  if (!show) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleAdd({ name, mimeType, size, path, user_id });
    onClose();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Add file</h2>
        <form>
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
            <label htmlFor="name">Mime type:</label>
            <input
              type="text"
              id="mime_type"
              name="name"
              value={mimeType}
              onChange={(e) => setMimeType(e.target.value)}
              required
            />
            <label htmlFor="name">Size:</label>
            <input
              type="text"
              id="size"
              name="name"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
            <label htmlFor="name">Path:</label>
            <input
              type="text"
              id="path"
              name="name"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              required
            />
          </div>
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

export default AddFileModal;
