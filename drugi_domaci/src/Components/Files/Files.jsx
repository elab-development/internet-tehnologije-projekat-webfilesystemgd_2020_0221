import React, { useState, useEffect } from "react";
import File from "./File";
import styles from "./Files.module.css";

function Files({ user }) {
  const [files, setFiles] = useState([]);

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
        return fetch(`http://localhost:8000/files`);
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

  return (
    <div className={styles.container}>
      {files &&
        files.map((element) => (
          <File
            key={element.id}
            file={element}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        ))}
    </div>
  );
}

export default Files;
