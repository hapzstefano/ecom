import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import "./signin.css";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const encryptStorage = new EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
  const history = useHistory();
  useEffect(() => {
    $("input").each(function () {
      if ($(this).val().length > 0) {
        $(this).addClass("not-empty");
      } else {
        $(this).removeClass("not-empty");
      }

      $(this).on("change", function () {
        if ($(this).val().length > 0) {
          $(this).addClass("not-empty");
        } else {
          $(this).removeClass("not-empty");
        }
      });
    });
    document.title = "Login";
  }, []);
  const handleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios
      .post(`http://localhost:3001/login`, {
        email: email,
        password: password,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "customer") {
          console.log("masuk");
          encryptStorage.setItem("user_logged_in", res.data);
          history.push("/");
        } else if (res.data.status === "admin") {
          encryptStorage.setItem("admin_logged_in", res.data);
          history.push("/");
        } else {
          encryptStorage.setItem("manager_logged_in", res.data);
          history.push("/");
        }
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
    //DISINI PENGECEKAN EMAIL PASSWORD DR API
    // if (email === "manager@123" && password === "manager") {
    //   encryptStorage.setItem("manager_logged_in", true);
    // } else if (email === "admin@123" && password === "admin") {
    //   encryptStorage.setItem("admin_logged_in", true);
    // } else {
    //   encryptStorage.setItem("user_logged_in", true);
    // }
  };
  return (
    <div
      className="container-signin"
      style={{
        backgroundImage: "url('/assets/images/global/signup.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="content-signin">
        <h2>Sign In</h2>
        <form onSubmit={(e) => handleSignIn(e)}>
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

          <ButtonRipple type="submit" text="Sign In" />
        </form>
        <p className="asterisk">
          &#42; By logging in, you agree to our Terms of Use and to receive our
          emails & updates and acknowledge that you read our Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
