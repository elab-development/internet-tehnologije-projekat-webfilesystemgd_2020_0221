import React from "react";
import styles from "./AddFileModal.module.css";
import { useState } from "react";
import { SiGoogledocs, SiGooglesheets, SiGoogleslides } from "react-icons/si";
import Select from "react-select";

function AddFileModal({ show, onClose, handleAdd, user_id }) {
  const [name, setName] = useState("");
  const [mime_type, setMimeType] = useState("");
  const [size] = useState(0);
  const [path, setPath] = useState("");

  const options = [
    { value: "document", label: "Document", icon: <SiGoogledocs /> },
    { value: "table", label: "Table", icon: <SiGooglesheets /> },
    { value: "presentation", label: "Presentation", icon: <SiGoogleslides /> },
  ];

  if (!show) {
    return null;
  }

  const handleClick = () => {
    setPath(`/${name}`);
    handleAdd({ name, mime_type, size, path, user_id });
    onClose();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Add file</h2>
        <form onSubmit={handleClick}>
          <div className={styles.input_box}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <label htmlFor="mime_type">Mime type:</label>

            <Select
              id="mime_type"
              name="mime_type"
              options={options}
              getOptionLabel={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {option.icon}
                  <span style={{ marginLeft: 8 }}>{option.label}</span>
                </div>
              )}
              isSearchable={false}
              required={true}
              onChange={(e) => {
                setMimeType(e.value);
              }}
            />
          </div>
          <button
            className={styles.submit_btn}
            type={"submit"}
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
