import React from "react";
import "./EditModal.css";
import { useState } from "react";

function EditModal({ show, onClose, handleEdit, id }) {
  const [position, setPosition] = useState("");
  if (!show) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleEdit(position, id);
    onClose();
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Change position</h2>
        <form>
          <div className="modal-input-box">
            <label htmlFor="name">Position:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <button onClick={handleClick} className="submit-btn" type="submit">
            Edit
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default EditModal;
