import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { encryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import "./forget.css";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleForget = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="container-forget"
      style={{
        backgroundImage: "url('/assets/images/global/signup.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="content-forget">
        <h2>Forget Password</h2>
        <form onSubmit={(e) => handleForget(e)}>
          <div className="form-input">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">
              <span>Email</span>{" "}
            </label>
          </div>
          <ButtonRipple type="submit" text="Forget Password" />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
