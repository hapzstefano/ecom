import React, { useState, useEffect } from "react";
import { EncryptStorage } from "encrypt-storage";
import $ from "jquery";
import { useHistory } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const encryptStorage = new EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();

  const handleLogin = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    if (email === "admin" && pass === "admin") {
      encryptStorage.setItem("admin_logged_in", true);
    } else {
      //DISINI PENGECEKAN EMAIL PASSWORD DR API
      encryptStorage.setItem("user_logged_in", true);
    }
    history.push("/buku");
  };
  return (
    <div className="sign-in-box">
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Email</label> <br />
        <input
          type="password"
          name="pass"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
