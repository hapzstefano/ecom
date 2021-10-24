import React, { useState, useEffect } from "react";
import { EncryptStorage } from "encrypt-storage";
import $ from "jquery";
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
    document.title = "Login";
  }, []);
  const handleSignIn = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    if (email === "admin" && password === "admin") {
      encryptStorage.setItem("admin_logged_in", true);
    } else {
      //DISINI PENGECEKAN EMAIL PASSWORD DR API
      encryptStorage.setItem("user_logged_in", true);
    }
    history.push("/");
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
