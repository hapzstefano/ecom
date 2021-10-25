import React, { useState, useEffect } from "react";
import axios from "axios";
import { encryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import "./signup.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");
  const [address, setAddress] = useState("");
  const [phonenum, setPhonenum] = useState("");
  useEffect(() => {
    document.title = "Register";
  }, []);
  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3001/register`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        //error
        if (err.response) {
          console.log("res error", err.response.data);
        } else if (err.request) {
          console.log("req error", err.request.data);
        } else {
          console.log("Error", err.message);
        }
      });
  };
  return (
    <div
      className="container-signup"
      style={{
        backgroundImage: "url('/assets/images/global/signup.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="content-signup">
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleSignUp(e)}>
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
          <div className="form-input">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">
              <span>Nama</span>
            </label>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">
              <span>Password</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="password"
              name="conpass"
              id="conpass"
              value={conpass}
              onChange={(e) => setConpass(e.target.value)}
            />
            <label htmlFor="conpass">
              <span>Confirm Password</span>
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="address">
              <span>Alamat</span>
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="phonenum"
              id="phonenum"
              value={phonenum}
              onChange={(e) => setPhonenum(e.target.value)}
            />
            <label htmlFor="phonenum">
              <span>No telp.</span>{" "}
            </label>
          </div>
          <ButtonRipple type="submit" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
