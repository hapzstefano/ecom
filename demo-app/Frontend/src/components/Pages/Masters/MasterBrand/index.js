import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
const MasterBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandImg, setBrandImg] = useState("");
  const [brandReadyImg, setBrandReadyImg] = useState("");
  const history = useHistory();

  const onSelectFile = (e) => {
    setBrandReadyImg(true);
    setBrandImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
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
    document.title = "Master Brand";
  }, []);
  const handleBrand = (event) => {
    event.preventDefault();
    console.log(brandImg);
    history.push("/masterbrand");
  };
  return (
    <div className="container-master">
      <div className="box">
        <form onSubmit={(e) => handleBrand(e)}>
          <div className="form-input">
            <input
              type="text"
              name="brandName"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
            <label htmlFor="brandName">
              <span>Name</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="brandDesc"
              id="brandDesc"
              value={brandDesc}
              onChange={(e) => setBrandDesc(e.target.value)}
            />
            <label htmlFor="brandDesc">
              <span>Description</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="file"
              name="brandImg"
              id="brandImg"
              onChange={(e) => onSelectFile(e)}
            />
          </div>
          <ButtonRipple
            type="submit"
            text="Proceed"
            className="button-submit"
          />
        </form>
      </div>
    </div>
  );
};

export default MasterBrand;
