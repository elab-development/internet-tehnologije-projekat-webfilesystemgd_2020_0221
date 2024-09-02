import React from "react";
import styles from "./File.module.css";
import Button from "../Button/Button";
import EditFileModal from "./EditFileModal";
import { useState } from "react";

function File({ file, handleEdit, handleRemove }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className={styles.card}>
      <div className={styles.information}>
        <div className={styles.line}>
          <h1>File name:</h1>
          <h1>{file.name}</h1>
        </div>
        <div className={styles.line}>
          <span>Path: </span>
          <p>{file.path}</p>
        </div>
        <div className={styles.line}>
          <span>Mime_type: </span>
          <p>{file.mime_type}</p>
        </div>
        <div className={styles.line}>
          <span>Size: </span>
          <p>{file.size}B</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button text="Edit file" handleClick={toggleModal} />
        <Button text="Remove" handleClick={() => handleRemove(file.id)} />
      </div>
      <EditFileModal
        show={showModal}
        onClose={toggleModal}
        handleEdit={handleEdit}
        id={file.id}
      />
    </div>
  );
}

export default File;
