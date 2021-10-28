import React, { useState, useEffect } from "react";
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
    </div>
  );
};

export default Home;
