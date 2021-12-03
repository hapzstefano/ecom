import React, { useState, useEffect, Component } from "react";
import $ from "jquery";
import axios from "axios";
import Select from "react-select";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./detail.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
const Detail = () => {
  useEffect(() => {
    $(
      '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
    ).insertAfter(".quantity input");
    $(".quantity").each(function () {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find(".quantity-up"),
        btnDown = spinner.find(".quantity-down"),
        min = input.attr("min"),
        max = input.attr("max");

      btnUp.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
    });
    document.title = "Detail";
  }, []);
  return (
    <div className="container-detail">
      <div className="product-detail">
        <div className="product-image">
          <img src="/assets/images/home/mouse.png" alt="" />
        </div>
        <div className="product-description">
          <h2>Mouse Terbaik</h2>
          <span>Rp. 3.000.000</span>
          <span className="rating-star">
            {" "}
            <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} /> 5 (7
            Ulasan)
          </span>
          <hr />
          <h3 style={{ marginBottom: "0.3em" }}>Description</h3>
          <div className="description-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus accusantium, soluta odio aspernatur enim, quo aperiam
            impedit illum deserunt, nam sint consequatur maiores voluptates
            corporis laboriosam a officia similique dolorum!
          </div>
          <div className="spinner-wrapper">
            <div class="quantity">
              <input type="number" min="1" max="9" step="1" value="1" />
            </div>
            <ButtonRipple text="Add To Cart" />
          </div>
        </div>
      </div>
      <div className="related-product-container">
        <h1>Related Product</h1>
        <hr style={{ marginBottom: "2em" }} />
        <Swiper
          spaceBetween={50}
          allowTouchMove={true}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            375: {
              slidesPerView: 2,
            },
            600: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
          <SwiperSlide className="detail-swiper-slide">
            <img src="/assets/images/home/mouse.png" alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <h1>Review</h1>
      <hr />
      <div className="review-detail-container">
        <div className="review-wrapper">
          <div className="review-profile">
            <FontAwesomeIcon icon={faUserCircle} className="review-icon" />
            <span>Samuel</span>
          </div>
          <div className="review-text">
            <span className="review-star">
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
            </span>
            <div className="review-paragraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
              repellat fuga reiciendis doloremque atque deleniti. Officia in
              ipsum dolor a reprehenderit minima labore qui praesentium ea
              nihil, eaque doloribus dolorum? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Molestias aspernatur accusantium
              maiores, nam eligendi earum dolor eaque, architecto animi
              repellendus dolorum ab. Ipsam, assumenda ab sapiente tempore
              itaque sint velit.
            </div>
          </div>
        </div>
        <div className="review-wrapper">
          <div className="review-profile">
            <FontAwesomeIcon icon={faUserCircle} className="review-icon" />
            <span>Samuel</span>
          </div>
          <div className="review-text">
            <span className="review-star">
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
              <FontAwesomeIcon icon={faStar} style={{ color: "#F4D03F" }} />
            </span>
            <div className="review-paragraph">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
              repellat fuga reiciendis doloremque atque deleniti. Officia in
              ipsum dolor a reprehenderit minima labore qui praesentium ea
              nihil, eaque doloribus dolorum? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Molestias aspernatur accusantium
              maiores, nam eligendi earum dolor eaque, architecto animi
              repellendus dolorum ab. Ipsam, assumenda ab sapiente tempore
              itaque sint velit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
