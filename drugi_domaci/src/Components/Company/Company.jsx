import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Company.css";

function Company({ user, setCompany }) {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
        phone,
        description,
        user_id: user.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        const data = response.json();
        setCompany(data);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="form-container">
      <h2>Create Your Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Company Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter company address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter company description"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Create Company
        </button>
      </form>
    </div>
  );
}

export default Company;
