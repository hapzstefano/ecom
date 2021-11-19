import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../../ButtonRipple";
import "../master.css";
import "../table.css";
import { generateFormData } from "../../../../utils/generateFormData";
const MasterStock = () => {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [stockImg, setStockImg] = useState(null);
  const [stockBrand, setStockBrand] = useState("");
  const [stockCategory, setStockCategory] = useState("");
  const [stockReadyImg, setStockReadyImg] = useState("");
  const [stockId, setStockId] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const [tempBrand, setTempBrand] = useState([]);
  const [tempCate, setTempCate] = useState([]);
  const [tempStock, setTempStock] = useState([]);
  const history = useHistory();

  const onSelectFile = (e) => {
    setStockReadyImg(true);
    setStockImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  useEffect(() => {
    //get Table
    axios
      .get(`http://localhost:3001/admin/getAllBarang`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res.data);
        setTempStock(res.data);
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
    //get Brand
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
    //get Category
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
  const handleStock = (e) => {
    let url=`http://localhost:3001/admin/addBarang`;
    if(activeButton == "update"){
      url = "http://localhost:3001/admin/updateBarang/"+stockId;
    }
    else if(activeButton == "delete"){
      url = "http://localhost:3001/admin/deleteBarang/"+stockId;
    }
    const formData = generateFormData({
      name: stockName,
      price: stockPrice,
      stok: stockQty,
      image: stockImg,
      brand: stockBrand,
      category: stockCategory,
    });
    e.preventDefault();
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setStockName("");
        setStockPrice("");
        setStockQty("");
        console.log(res.data);
        history.push("/masterstock");
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
  const updateStock = (index) =>{
    setStockName(tempStock[index]['nama']);
    setStockPrice(tempStock[index]['harga']);
    setStockQty(tempStock[index]['stok']);
    setStockImg(tempStock[index]['gambar']);
    setStockId(tempStock[index]['_id']);
    setActiveButton("update");
  };
  return (
    <>
      <div className="container-master">
        <div className="box">
        <h1 style={{
            paddingTop:"0.3em",         
          }}>Master Stock</h1>
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
                    return (
                      <option value={props.nama} key={index}>
                        {props.nama}
                      </option>
                    );
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
                    return (
                      <option value={props.nama} key={index}>
                        {props.nama}
                      </option>
                    );
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
      <div className="table-container">
        <h2>List Stock</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tempStock &&
              tempStock.map((props, index) => {
                return (
                  <tr>
                    <td>{props.nama}</td>
                    <td>{props.harga}</td>
                    <td>{props.stok}</td>
                    <td>{props.gambar}</td>
                    <td>{props.category}</td>
                    <td>{props.brand}</td>
                    <td style={{ display: "flex" }}>
                      <ButtonRipple text="Update" onClick={(e) => updateStock(index)}/>
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

export default MasterStock;
