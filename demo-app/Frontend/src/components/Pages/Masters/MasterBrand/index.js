import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import { generateFormData } from "../../../../utils/generateFormData";
import "../master.css";
const MasterBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [brandImg, setBrandImg] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandReadyImg, setBrandReadyImg] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [tempBrand, setTempBrand] = useState([]);
  const history = useHistory();

  const onSelectFile = (e) => {
    setBrandReadyImg(true);
    setBrandImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/getAllBrand`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setTempBrand(res.data);
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
    document.title = "Master Brand";
  }, []);
  const handleBrand = (event) => {
    let url=`http://localhost:3001/admin/addBrand`;
    if(activeButton == "update"){
      url = "http://localhost:3001/admin/updateBrand/"+brandId;
    }
    const formData = generateFormData({
      name: brandName,
      description: brandDesc,
      image: brandImg,
    });
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //console.log(res.data);
        setBrandName("");
        setBrandDesc("");
        setBrandImg("");
        setActiveButton("");
        setBrandReadyImg("");
        history.push("/masterbrand");
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
    history.push("/masterbrand");
  };
  const updateBrand = (index) =>{
    document.querySelector("#brandName").classList.add("not-empty");
    document.querySelector("#brandDesc").classList.add("not-empty");
    document.querySelector("#brandImg").classList.add("not-empty");
    setBrandName(tempBrand[index]['nama']);
    setBrandDesc(tempBrand[index]['deskripsi']);
    setBrandImg(tempBrand[index]['gambar']);
    setBrandId(tempBrand[index]['_id']);
    setActiveButton("update");
    window.scrollTo(0,0);
    console.log(activeButton);
  };
  const deleteBrand = (index) =>{
    setBrandId(tempBrand[index]['_id']);
    axios
      .post("http://localhost:3001/admin/deleteBrand/"+tempBrand[index]['_id'], {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        //console.log(res.data);
        history.push("/masterbrand");
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
    history.push("/masterbrand");
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
          <h1 style={{
            paddingTop:"0.3em",         
          }}>Master Brand</h1>
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
      <div className="table-container">
        <h2>List Brand</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempBrand &&
              tempBrand.map((props, index) => {
                return (
                  <tr>
                    <td>{props.nama}</td>
                    <td><img src={props.gambar} alt={props.nama} style={{ width:"8rem", aspectRatio:"1/1", objectFit:"contain", }}/></td>
                    <td>{props.deskripsi}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height:"9.7rem"
                      }}
                    >
                      <ButtonRipple text="Update" onClick={(e) => updateBrand(index)}/>
                      <form onSubmit={(e) => deleteBrand(index)}>
                      <ButtonRipple type="submit" text="Delete" />
                      </form>
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

export default MasterBrand;
