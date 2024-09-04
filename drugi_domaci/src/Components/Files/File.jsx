import React from "react";
import styles from "./File.module.css";
import Button from "../Button/Button";
import EditFileModal from "./EditFileModal";
import { useState } from "react";
import AddPrivilegeModal from "./AddPrivilegeModal";

function File({ file, handleEdit, handleRemove, company, handleAddPrivilege }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);

  const togglePrivilegeModal = () => {
    setShowPrivilegeModal(!showPrivilegeModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
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
        <Button text="Edit file" handleClick={toggleEditModal} />
        <Button text="Remove" handleClick={() => handleRemove(file.id)} />
        <Button text="Add privilege" handleClick={togglePrivilegeModal} />
      </div>
      <EditFileModal
        show={showEditModal}
        onClose={toggleEditModal}
        handleEdit={handleEdit}
        id={file.id}
      />
      <AddPrivilegeModal
        show={showPrivilegeModal}
        onClose={togglePrivilegeModal}
        company={company}
        file_id={file.id}
        handleAdd={handleAddPrivilege}
      />
    </div>
  );
}

export default File;
