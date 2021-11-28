import React, { useState, useEffect, Component } from "react";
import $ from "jquery";
import axios from "axios";
import Aos from "aos";
import Select from "react-select";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonRipple from "../../ButtonRipple";
import "./shop.css";
import "aos/dist/aos.css";
const Shop = () => {
  const [tempSort, setTempSort] = useState("");

  const optionSort = [
    { value: "1", label: "Paling Sesuai" },
    { value: "2", label: "Harga Tertinggi" },
    { value: "3", label: "Harga Terendah" },
  ];
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
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
          <div className="brand-container">
            <div className="brand-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="brand-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="brand-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="brand-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
          </div>
          <h2>Category</h2>
          <div className="cate-container">
            <div className="cate-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="cate-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="cate-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
            <div className="cate-wrapper">
              <input type="checkbox" name="" id="" value="Asus" />
              <span>&nbsp; Asus</span>
            </div>
          </div>
        </div>
        <div className="product-shop">
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
          <div className="shop-product-wrapper" data-aos="fade-up">
            <div className="img-shop-product">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="title-shop-product">
              <h3>Mouse Rog</h3>
            </div>
            <div className="price-shop-product">
              <h4>Rp 300.000</h4>
            </div>
            <div className="button-shop-product">
              <ButtonRipple text="Buy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
