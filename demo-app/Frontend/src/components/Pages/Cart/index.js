import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonRipple from "../../ButtonRipple";
import "./cart.css";
const Cart = () => {
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-content">
        <div className="cart-list-items">
          <div className="cart-list-items-wrapper">
            <div className="cart-list-items-img">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="cart-list-info">
              <div className="cart-item-name">
                <h2>Mouse</h2>
              </div>
              <div className="cart-item-brand">
                <h3>Asus</h3>
              </div>
              <div className="cart-item-price">
                <h3>Rp. 100.000</h3>
              </div>
              <div className="cart-item-multiply">
                Qty:{" "}
                <input
                  type="number"
                  name=""
                  defaultValue="2"
                  id=""
                  style={{ width: "3em" }}
                />{" "}
              </div>
              <div className="cart-delete">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "1.5em", marginTop: "0.3em" }}
                />
              </div>
            </div>
          </div>
          <div className="cart-list-items-wrapper">
            <div className="cart-list-items-img">
              <img src="/assets/images/home/mouse.png" alt="" />
            </div>
            <div className="cart-list-info">
              <div className="cart-item-name">
                <h2>Mouse</h2>
              </div>
              <div className="cart-item-brand">
                <h3>Asus</h3>
              </div>
              <div className="cart-item-price">
                <h3>Rp. 100.000</h3>
              </div>
              <div className="cart-item-multiply">
                Qty:{" "}
                <input
                  type="number"
                  name=""
                  defaultValue="2"
                  id=""
                  style={{ width: "3em" }}
                />{" "}
              </div>
              <div className="cart-delete">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "1.5em", marginTop: "0.3em" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="cart-subtotal-wrapper">
          <h2>Subtotal</h2>
          <span>Total (4 Products)</span>
          <span>Subtotal&emsp;&nbsp;: Rp 400.000</span>
          <span>Discount&emsp;: Rp 10.000</span>
          <ButtonRipple type="submit" text="Checkout" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
