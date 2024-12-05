import React from "react";
import styles from "./Profile.module.css";
import { IoPersonCircleOutline } from "react-icons/io5";
function Profile({ user }) {
  return (
    <div className={styles.container}>
      <div className={styles.slika}>
        <IoPersonCircleOutline size={100} />
      </div>
      <div className={styles.info}>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
        {localStorage.getItem("employee") && <p>Position:{user.position}</p>}
      </div>
    </div>
  );
}

export default Profile;
