import React, { useState, useEffect } from "react";
import $ from "jquery";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import { Swiper, SwiperSlide } from "swiper/react";
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
              <div className="overview-product-title">Mother Board</div>
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
    </div>
  );
};

export default Home;
