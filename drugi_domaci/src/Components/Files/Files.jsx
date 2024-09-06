import React, { useState, useEffect } from "react";
import File from "./FilesTable.jsx";
import styles from "./Files.module.css";
import { DataGrid } from "@mui/x-data-grid";
import FilesTable from "./FilesTable.jsx";
import EditFileModal from "./EditFileModal";
import AddPrivilegeModal from "./AddPrivilegeModal.jsx";

function Files({ user, company }) {
  const [files, setFiles] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);

  const togglePrivilegeModal = () => {
    setShowPrivilegeModal(!showPrivilegeModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8000/files?user_id=${user.id}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error("Server error");
          }
          response
            .json()
            .then((data) => {
              setFiles(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    }
  }, [user]);

  const procesedFiles = files.map((file) => {
    return {
      id: file.id,
      name: file.name,
      size: file.size,
      mime_type: file.mime_type,
    };
  });

  const handleEdit = (fileName, id) => {
    if (!fileName) return;
    fetch(`http://localhost:8000/files/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: fileName }),
    })
      .then(() => {
        return fetch(`http://localhost:8000/files?user_id=${user.id}`);
      })
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleRemove = (id) => {
    fetch(`http://localhost:8000/files/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Server error");
      }
      setFiles(files.filter((element) => element.id !== id));
    });
  };

  const handleAddPrivilege = (employee_id, file_id, can_view, can_edit) => {
    fetch("http://localhost:8000/privileges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: employee_id,
        file_id: file_id,
        can_view: can_view,
        can_edit: can_edit,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    // <div className={styles.container}>
    //   {/* {files &&
    //     files.map((element) => (
    //       <File
    //         key={element.id}
    //         file={element}
    //         handleRemove={handleRemove}
    //         handleEdit={handleEdit}
    //         company={company}
    //         handleAddPrivilege={handleAddPrivilege}
    //       />
    //       ))} */}
    //       </div>

    <FilesTable
      files={procesedFiles}
      handleDelete={handleRemove}
      handleEdit={handleEdit}
      handleAddPrivilege={handleAddPrivilege}
      company={company}
    />
  );
}

export default Files;
