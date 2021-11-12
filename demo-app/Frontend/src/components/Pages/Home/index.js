import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import { Parallax, Background } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-vanilla-tilt";
import { Icon } from "@iconify/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

import "./home.css";
import "swiper/swiper-bundle.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([EffectFade, Autoplay, Navigation, Pagination]);
const Home = () => {
  useEffect(() => {
    $(".overview-product-content").mouseenter(function () {
      $(this).find(".content-img-anim").addClass("animate");
      $(this).find(".overview-product-title").animate(
        {
          top: 0,
          opacity: 1,
        },
        350
      );
    });
    $(".overview-product-content").mouseleave(function () {
      $(this).find(".content-img-anim").removeClass("animate");
      $(this).find(".overview-product-title").finish();
      $(this).find(".overview-product-title").animate(
        {
          top: 150,
          opacity: 0,
        },
        350
      );
    });
    $(".tilt-popular").mouseenter(function () {
      $(this).find(".popular-img").css({ transform: "translateZ(20px)" });
    });
    $(".tilt-popular").mouseleave(function () {
      $(this).find(".popular-img").css({ transform: "" });
    });
    $(".custom-button").click(function (e) {
      let x = e.pageX - $(this).offset().left;
      let y = e.pageY - $(this).offset().top;
      console.log(x);
      console.log(y);
      var style = {
        css: {
          left: x + "px",
          top: y + "px",
        },
      };
      var span = $("<span></span>", style);
      $(this).append(span);
      setTimeout(function () {
        span.remove();
      }, 500);
    });
    document.title = "Home";
  }, []);
  return (
    <div className="container-home">
      <div className="Swiper">
        <Swiper
          effect="fade"
          className="swiper-container-fade"
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          allowTouchMove={true}
          navigation
          pagination
        >
          <SwiperSlide className="swiper-slide">
            <picture>
              <source
                media="(max-width:900px)"
                srcSet="/assets/images/home/bannerV1.jpg"
              />
              <img src="/assets/images/home/banner1.jpg" alt="" />
            </picture>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <picture>
              <source
                media="(max-width:900px)"
                srcSet="/assets/images/home/bannerV2.jpg"
              />
              <img src="/assets/images/home/banner2.jpg" alt="" />
            </picture>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <picture>
              <source
                media="(max-width:900px)"
                srcSet="/assets/images/home/bannerV3.jpg"
              />
              <img src="/assets/images/home/banner3.jpg" alt="" />
            </picture>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="overview-product-container">
        <div className="overview-title">
          <h1>OUR PRODUCT LIST</h1>
          <div className="overview-product-wrapper">
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/cpu.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Processor</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/gpu.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Graphic Card</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/mobo.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Motherboard</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/ram.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">RAM</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/monitor.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Monitor</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/mouse.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Mouse</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/keyboard.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Keyboard</div>
            </div>
            <div className="overview-product-content">
              <div className="overview-product-img">
                <img
                  src="/assets/images/home/case.png"
                  alt=""
                  className="content-img-anim"
                />
              </div>
              <div className="overview-product-title">Desktop Case</div>
            </div>
          </div>
        </div>
      </div>
      <div className="parallax-container">
        <Parallax strength={300} style={{ height: "100%", marginTop: "2em" }}>
          <Background className="custom-bg">
            <img
              src="/assets/images/home/parallax.jpg"
              alt="parallax"
              style={{ height: "100vh", width: "100vw" }}
            />
          </Background>
          <div className="parallax-cover">
            <div className="parallax-title">
              <h2>WEBSITE ACHIEVEMENTS</h2>
            </div>
            <div className="parallax-icon">
              <div className="parallax-first">
                <Icon icon="ri:24-hours-fill" style={{ fontSize: "5em" }} />
                <div id="parallax-upper">24</div>
                <div className="parallax-bottom">HOURS OF WORK</div>
              </div>
              <div className="parallax-second">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ fontSize: "5em" }}
                />
                <div id="parallax-upper">100++</div>
                <div className="parallax-bottom">SALES MONTHLY</div>
              </div>
              <div className="parallax-third">
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ fontSize: "5em" }}
                />
                <div id="parallax-upper">34</div>
                <div className="parallax-bottom">COOPERATION</div>
              </div>
              <div className="parallax-fourth">
                <FontAwesomeIcon
                  icon={faShippingFast}
                  style={{ fontSize: "4.6em", marginBottom: "0.1em" }}
                />
                <div id="parallax-upper">10</div>
                <div className="parallax-bottom">SHIPMENT</div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
      <div className="populer-product">
        <div className="popular-title">
          <h2>POPULAR PRODUCT</h2>
        </div>
        <div className="popular-item-container">
          <Tilt className="tilt-popular">
            <div className="popuplar-item-wrapper">
              <div className="popular-item-name">GTX 1650 SUPER</div>
              <img
                src="/assets/images/home/mouse.png"
                alt="popular-img"
                className="popular-img"
              />
              <button className="custom-button">Buy Now</button>
            </div>
          </Tilt>
          <Tilt className="tilt-popular">
            <div className="popuplar-item-wrapper">
              <div className="popular-item-name">GTX 1650 SUPER</div>
              <img
                src="/assets/images/home/gpu.png"
                alt="popular-img"
                className="popular-img"
              />
              <button className="custom-button">Buy Now</button>
            </div>
          </Tilt>
          <Tilt className="tilt-popular">
            <div className="popuplar-item-wrapper">
              <div className="popular-item-name">GTX 1650 SUPER</div>
              <img
                src="/assets/images/home/cpu.png"
                alt="popular-img"
                className="popular-img"
              />
              <button className="custom-button">Buy Now</button>
            </div>
          </Tilt>
          <Tilt className="tilt-popular">
            <div className="popuplar-item-wrapper">
              <div className="popular-item-name">GTX 1650 SUPER</div>
              <img
                src="/assets/images/home/monitor.png"
                alt="popular-img"
                className="popular-img"
              />
              <button className="custom-button">Buy Now</button>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default Home;
