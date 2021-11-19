import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
import "../table.css";
const MasterPromo = () => {
  const [promoName, setPromoName] = useState("");
  const [promoStart, setPromoStart] = useState("");
  const [promoEnd, setPromoEnd] = useState("");
  const [promoDisc, setPromoDisc] = useState("");
  const [tempPromo, setTempPromo] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/getAllPromo`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setTempPromo(res.data);
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
    document.title = "Master Promo";
  }, []);
  const handlePromo = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/admin/addPromo`, {
        namaPromo: promoName,
        tglAwalPromo: promoStart,
        tglAkhirPromo: promoEnd,
        potongan: promoDisc,
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
    console.log(promoEnd);
    history.push("/masterpromo");
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
          <form onSubmit={(e) => handlePromo(e)}>
            <div className="form-input">
              <input
                type="text"
                name="promoName"
                id="promoName"
                value={promoName}
                onChange={(e) => setPromoName(e.target.value)}
              />
              <label htmlFor="promoName">
                <span>Promo Name</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="date"
                class="not-empty"
                name="promoStart"
                id="promoStart"
                value={promoStart}
                onChange={(e) => setPromoStart(e.target.value)}
              />
              <label htmlFor="promoStart">
                <span>Date Start</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="date"
                name="promoEnd"
                id="promoEnd"
                className="not-empty"
                value={promoEnd}
                onChange={(e) => setPromoEnd(e.target.value)}
              />
              <label htmlFor="promoEnd">
                <span>Date End</span>{" "}
              </label>
            </div>
            <div className="form-input">
              <input
                type="text"
                name="promoDisc"
                id="promoDisc"
                value={promoDisc}
                onChange={(e) => setPromoDisc(e.target.value)}
              />
              <label htmlFor="promoDisc">
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
        <h2>List Promo</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Start</th>
              <th>Date End</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempPromo &&
              tempPromo.map((props, index) => {
                return (
                  <tr>
                    <td>{props.nama}</td>
                    <td>{props.tanggal_awal}</td>
                    <td>{props.tanggal_akhir}</td>
                    <td>{props.potongan}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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

export default MasterPromo;
