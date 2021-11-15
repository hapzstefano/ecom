import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
const MasterMember = () => {
  const [memberName, setMemberName] = useState("");
  const [memberPoin, setMemberPoin] = useState("");
  const [memberDisc, setMemberDisc] = useState("");
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
    document.title = "Master Member";
  }, []);
  const handleMember = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/admin/addMember`, {
        nama:memberName,
        minim_poin:memberPoin,
        potongan:memberDisc,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
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
  return (
    <div className="container-master">
      <div className="box">
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
  );
};

export default MasterMember;
