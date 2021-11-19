import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import "./profile.css";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const encryptStorage = new EncryptStorage(
    `${process.env.REACT_APP_LOCAL_STORAGE_SECRET_KEY}`
  );
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
    document.title = "Profile";
  }, []);
  const updateProfile = (event) => {};
  return (
    <div className="profile-container">
      <div className="box-profile">
        <div className="profile-img-wrapper">
          <img
            src="https://toppng.com/public/uploads/thumbnail/black-and-white-stockportable-network-account-icon-1155343638368tdnw6eom.png"
            alt=""
            className="profile-img-content"
          />
        </div>
        <div className="profile-data-wrapper">
          <form onSubmit={(e) => updateProfile(e)}>
            <div className="form-input">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">
                <span>Name</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                style={{ pointerEvents: "none", backgroundColor: "lightgrey" }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">
                <span>Email</span>{" "}
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
                <span>Address</span>
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
                <span>Phone Number</span>{" "}
              </label>
            </div>
            <ButtonRipple
              type="submit"
              text="Update"
              className="button-submit custom-buttom-center"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
