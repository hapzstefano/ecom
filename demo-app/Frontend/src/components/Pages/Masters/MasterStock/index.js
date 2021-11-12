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
  const [stockReadyImg, setStockReadyImg] = useState("");
  const history = useHistory();

  const onSelectFile = (e) => {
    setStockReadyImg(true);
    setStockImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  useEffect(() => {
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
