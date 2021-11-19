import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
const MasterEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePasword] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [tempEmployee, setTempEmployee] = useState("");
  const [status, setStatus] = useState("manager");
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
    document.title = "Master Employee";
  }, []);
  const handleEmployee = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/admin/addPegawai`, {
        nama: employeeName,
        email: employeeEmail,
        password: employeePassword,
        notlp: employeePhone,
        jenis: status,
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
    console.log(status);
    history.push("/masteremployee");
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
        <h1 style={{
            paddingTop:"0.3em",         
          }}>Master Employee</h1>
          <form onSubmit={(e) => handleEmployee(e)}>
            <div className="form-input">
              <input
                type="text"
                name="employeeName"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <label htmlFor="employeeName">
                <span>Name</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="email"
                name="employeeEmail"
                id="employeeEmail"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
              />
              <label htmlFor="employeeEmail">
                <span>Email</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="password"
                name="employeePassword"
                id="employeePassword"
                value={employeePassword}
                onChange={(e) => setEmployeePasword(e.target.value)}
              />
              <label htmlFor="employeePassword">
                <span>Password</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="text"
                name="employeePhone"
                id="employeePhone"
                value={employeePhone}
                onChange={(e) => setEmployeePhone(e.target.value)}
              />
              <label htmlFor="employeePhone">
                <span>Phone Number</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
              <label htmlFor="status">
                <span>Status</span>{" "}
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
        <h2>List Employee</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default MasterEmployee;
