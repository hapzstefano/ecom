import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonRipple from "../../ButtonRipple";
import "./wishlist.css";
const Wishlist = () => {
  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <div className="wishlist-content">
        <table className="wishlist-table">
          <thead>
            <tr style={{ borderBottom: "1px solid #cfcfcf" }}>
              <th></th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #cfcfcf" }}>
              <td>
                <img src="/assets/images/home/mouse.png" alt="" />
              </td>
              <td>Mouse Asus ROG</td>
              <td>Rp 100.000</td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "3.3em",
                  gap: "1em",
                }}
              >
                <ButtonRipple text="Unwishlist" />
                <ButtonRipple text="Add to Cart" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
