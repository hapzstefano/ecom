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
  const [brandReadyImg, setBrandReadyImg] = useState("");
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
    const formData = generateFormData({
      name: brandName,
      description: brandDesc,
      image: brandImg,
    });
    event.preventDefault();
    axios
      .post(`http://localhost:3001/admin/addBrand`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
    console.log(brandImg);
    history.push("/masterbrand");
  };
  return (
    <>
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
                    <td>{props.gambar}</td>
                    <td>{props.deskripsi}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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

export default MasterBrand;
