import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
import "../table.css";
const MasterMember = () => {
  const [memberName, setMemberName] = useState("");
  const [memberPoin, setMemberPoin] = useState("");
  const [memberDisc, setMemberDisc] = useState("");
  const [memberId, setMemberId] = useState("");
  const [tempMember, setTempMember] = useState([]);  
  const [activeButton, setActiveButton] = useState("");
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/getAllMember`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setTempMember(res.data);
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
    document.title = "Master Member";
  }, []);
  const handleMember = (event) => {
    let url=`http://localhost:3001/admin/addMember`;
    if(activeButton == "update"){
      url = "http://localhost:3001/admin/updateMember/"+memberId;
    }
    else if(activeButton == "delete"){
      url = "http://localhost:3001/admin/deleteMember/"+memberId;
    }
    axios
      .post(url, {
        nama: memberName,
        minim_poin: memberPoin,
        potongan: memberDisc,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        setMemberName("");
        setMemberPoin("");
        setMemberDisc("");
        setActiveButton("");
        history.push("/mastermember");
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
    console.log(memberDisc);
    history.push("/mastermember");
  };
  const updateMember = (index) =>{
    document.querySelector("#memberName").classList.add("not-empty");
    document.querySelector("#memberPoin").classList.add("not-empty");
    document.querySelector("#memberDisc").classList.add("not-empty");
    setMemberName(tempMember[index]['nama']);
    setMemberDisc(tempMember[index]['potongan']);
    setMemberPoin(tempMember[index]['minimal_poin']);
    setMemberId(tempMember[index]['_id']);
    setActiveButton("update");
    window.scrollTo(0,0);
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
        <h1 style={{
            paddingTop:"0.3em",         
          }}>Master Member</h1>
          <form onSubmit={(e) => handleMember(e)}>
            <div className="form-input">
              <input
                type="text"
                name="memberName"
                id="memberName"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              <label htmlFor="memberName">
                <span>Name</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="text"
                name="memberPoin"
                id="memberPoin"
                value={memberPoin}
                onChange={(e) => setMemberPoin(e.target.value)}
              />
              <label htmlFor="memberPoin">
                <span>Point</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="text"
                name="memberDisc"
                id="memberDisc"
                value={memberDisc}
                onChange={(e) => setMemberDisc(e.target.value)}
              />
              <label htmlFor="memberDisc">
                <span>Discount</span>{" "}
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
        <h2>List Member</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempMember &&
              tempMember.map((props, index) => {
                return (
                  <tr>
                    <td>{props.nama}</td>
                    <td>{props.minimal_poin}</td>
                    <td>{props.potongan}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonRipple text="Update" onClick={(e) => updateMember(index)}/>
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
export default MasterMember;
