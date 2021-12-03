import React, { useState, useEffect, Component } from "react";
import $ from "jquery";
import axios from "axios";
import Aos from "aos";
import Select from "react-select";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import NumberFormat from 'react-number-format';
import "./shop.css";
import "aos/dist/aos.css";
const Shop = () => {
  const [tempSort, setTempSort] = useState("");
  const [tempBrand, setTempBrand] = useState([]);
  const [tempCate, setTempCate] = useState([]);
  const [tempStock, setTempStock] = useState([]);

  const optionSort = [
    { value: "1", label: "Paling Sesuai" },
    { value: "2", label: "Harga Tertinggi" },
    { value: "3", label: "Harga Terendah" },
  ];
  useEffect(() => {
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
    //get brand
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
    Aos.init({ duration: 1000, once: true });
    document.title = "Shop Now!";
  }, []);
  return (
    <div className="container-shop">
      <h1>Product</h1>
      <div className="container-select">
        <Select
          className="select-sort"
          options={optionSort}
          onChange={setTempSort}
        />
      </div>
      <div className="content-shop">
        <div className="navigate-shop">
          <h2>Brand</h2>
          {tempBrand && tempBrand.map((props, index) => {
            return (
              <div className="brand-container">
                <div className="brand-wrapper">
                  <input type="checkbox" name="" id="" value={props.nama} />
                  <span>&nbsp; {props.nama}</span>
                </div>
              </div>
            );
          })}
          <br/>
          <h2>Category</h2>
          {tempCate && tempCate.map((props, index) => {
            return (
              <div className="cate-container">
                <div className="cate-wrapper">
                  <input type="checkbox" name="" id="" value={props.nama} />
                  <span>&nbsp; {props.nama}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="product-shop">
          {tempStock && tempStock.map((props, index) => {
            return (
              <div className="shop-product-wrapper" data-aos="fade-up">
                <div className="img-shop-product">
                  <img src={props.gambar} alt="" />
                </div>
                <div className="title-shop-product">
                  <h3 style={{  overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis"  }}>{props.nama}</h3>
                </div>
                <div className="price-shop-product">
                  <h4>Rp {props.harga}</h4>
                </div>
                <div className="button-shop-product">
                  <ButtonRipple text="Buy" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
