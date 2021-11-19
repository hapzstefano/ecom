import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
import "../table.css";
const MasterCategory = () => {
  const [cateName, setCateName] = useState("");
  const [tempCate, setTempCate] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/getAllCategory`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setTempCate(res.data);
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
    document.title = "Master Category";
  }, []);
  const handleCategory = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/admin/addCategory`, {
        name: cateName,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        history.push("/mastercategory");
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
    console.log(cateName);
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
          <form onSubmit={(e) => handleCategory(e)}>
            <div className="form-input">
              <input
                type="text"
                name="cateName"
                id="cateName"
                value={cateName}
                onChange={(e) => setCateName(e.target.value)}
              />
              <label htmlFor="cateName">
                <span>Name</span>{" "}
              </label>
            </div>
            <ButtonRipple
              type="submit"
              text="Proceed"
              className="button-submit"
            />
          </form>
        </div>
      </div>
      <div className="table-container">
        <h2>List Category</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempCate &&
              tempCate.map((props, index) => {
                return (
                  <tr>
                    <td>{props.nama}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <ButtonRipple text="Update" />
                      <ButtonRipple text="Delete" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MasterCategory;
