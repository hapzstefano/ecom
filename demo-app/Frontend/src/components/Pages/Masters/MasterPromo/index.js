import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import Moment from 'moment';
import "../master.css";
import "../table.css";
const MasterPromo = () => {
  const [promoName, setPromoName] = useState("");
  const [promoStart, setPromoStart] = useState("");
  const [promoEnd, setPromoEnd] = useState("");
  const [promoDisc, setPromoDisc] = useState("");
  const [promoId, setPromoId] = useState("");
  const [tempPromo, setTempPromo] = useState([]);
  const [activeButton, setActiveButton] = useState("");
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
    let url=`http://localhost:3001/admin/addPromo`;
    if(activeButton == "update"){
      url = "http://localhost:3001/admin/updatePromo/"+promoId;
    }
    else if(activeButton == "delete"){
      url = "http://localhost:3001/admin/deletePromo/"+promoId;
    }
    event.preventDefault();
    axios
      .post(url, {
        namaPromo: promoName,
        tglAwalPromo: promoStart,
        tglAkhirPromo: promoEnd,
        potongan: promoDisc,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setPromoName("");
        setPromoStart("");
        setPromoEnd("");
        setPromoDisc("");
        setActiveButton("");
        history.push("/masterpromo");
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
  const updatePromo = (index) =>{
    setPromoName(tempPromo[index]['nama']);
    setPromoStart(Moment(tempPromo[index]['tanggal_awal']).format("YYYY-MM-DD"));
    setPromoEnd(Moment(tempPromo[index]['tanggal_akhir']).format("YYYY-MM-DD"));
    setPromoDisc(tempPromo[index]['potongan']);    
    setPromoId(tempPromo[index]['_id']);
    setActiveButton("update");
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
        <h1 style={{
            paddingTop:"0.3em",         
          }}>Master Promo</h1>
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
                    <td>{Moment(props.tanggal_awal).format('DD/MM/YYYY')}</td>
                    <td>{Moment(props.tanggal_akhir).format('DD/MM/YYYY')}</td>
                    <td>{props.potongan}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ButtonRipple text="Update" onClick={(e) => updatePromo(index)}/>
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
