import React, { useState, useEffect } from "react";
import FilesTable from "./FilesTable.jsx";
import AddFileModal from "./AddFileModal.jsx";
import Button from "../Button/Button.jsx";
import styles from "./Files.module.css";

function Files({ user, company }) {
  const [files, setFiles] = useState([]);
  const [showModalFile, setShowModalFile] = useState(false);

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
  }, [user, showModalFile]);

  async function getAuthorName(userId) {
    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const authorName = data.name;
      return authorName;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  let procesedFiles = files.map((file) => {
    return {
      id: file.id,
      name: file.name,
      size: file.size,
      mime_type: file.mime_type,
      created_at: file.created_at,
      updated_at: file.updated_at,
      user_id: file.user_id,
    };
  });

  procesedFiles.forEach(async (file) => {
    file.user_id = await getAuthorName(file.user_id);
    switch (file.mime_type) {
      case "document":
        file.mime_type = "Docs 📄";
        break;
      case "table":
        file.mime_type = "Sheets 📊";
        break;
      case "presentation":
        file.mime_type = "Slides 🎬";
        break;
      default:
        file.mime_type = "Other";
        break;
    }
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
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const toggleModalFile = () => {
    setShowModalFile(!showModalFile);
  };

  const addFile = ({ name, mime_type, size, path, user_id }) => {
    fetch("http://localhost:8000/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mime_type: mime_type,
        size: size,
        path: path,
        user_id: user_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className={styles.buttonWrapper}>
        <Button
          handleClick={toggleModalFile}
          text={"Add File"}
          width={"200px"}
        />
      </div>
      <FilesTable
        files={procesedFiles}
        handleDelete={handleRemove}
        handleEdit={handleEdit}
        handleAddPrivilege={handleAddPrivilege}
        company={company}
      />
      <AddFileModal
        show={showModalFile}
        onClose={toggleModalFile}
        handleAdd={addFile}
        user_id={user?.id}
      />
    </>
  );
}

export default Files;
