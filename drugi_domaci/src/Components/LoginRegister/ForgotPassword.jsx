import { React, useState } from "react";
import email_icon from "../Assets/email.png";
import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.form_box_login}>
        <form onSubmit={handleSubmit} action="">
          <h1>Forgot password</h1>
          <div className={styles.input_box}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <img className={styles.icon} src={email_icon} alt="Neka slika" />
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
