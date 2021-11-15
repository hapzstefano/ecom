import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
const MasterStock = () => {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [stockImg, setStockImg] = useState("");
  const [stockBrand, setStockBrand] = useState("");
  const [stockCategory, setStockCategory] = useState("");
  const [stockReadyImg, setStockReadyImg] = useState("");
  const [tempBrand, setTempBrand] = useState([]);
  const [tempCate, setTempCate] = useState([]);
  const history = useHistory();

  const onSelectFile = (e) => {
    setStockReadyImg(true);
    setStockImg(e.target.files[0]);
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
    document.title = "Master Stock";
  }, []);
  const handleStock = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/addBarang`, {
        name: stockName,
        price: stockPrice,
        stok: stockQty,
        image: stockImg,
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
    console.log(stockImg);
    history.push("/masterstock");
  };
  return (
    <div className="container-master">
      <div className="box">
        <form onSubmit={(e) => handleStock(e)}>
          <div className="form-input">
            <input
              type="text"
              name="stockName"
              id="stockName"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
            <label htmlFor="stockName">
              <span>Name</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="stockPrice"
              id="stockPrice"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
            <label htmlFor="stockPrice">
              <span>Price</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="text"
              name="stockQty"
              id="stockQty"
              value={stockQty}
              onChange={(e) => setStockQty(e.target.value)}
            />
            <label htmlFor="stockQty">
              <span>Quantity</span>{" "}
            </label>
          </div>
          <div
            className="form-input"
            style={{ marginBottom: "2em", marginTop: "1em" }}
          >
            <select
              name="stockBrand"
              id="stockBrand"
              value={stockBrand}
              onChange={(e) => setStockBrand(e.target.value)}
            >
              {tempBrand &&
                tempBrand.map((props, index) => {
                  return <option value={props.id}>{props.nama}</option>;
                })}
            </select>
            <label htmlFor="stockBrand">
              <span>Brand</span>{" "}
            </label>
          </div>
          <div className="form-input" style={{ marginBottom: "1em" }}>
            <select
              name="stockCategory"
              id="stockCategory"
              value={stockCategory}
              onChange={(e) => setStockCategory(e.target.value)}
            >
              {tempCate &&
                tempCate.map((props, index) => {
                  return <option value={props.id}>{props.nama}</option>;
                })}
            </select>
            <label htmlFor="stockCategory">
              <span>Category</span>{" "}
            </label>
          </div>
          <div className="form-input">
            <input
              type="file"
              name="stockImg"
              id="stockImg"
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

export default MasterStock;
