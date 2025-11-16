import React from "react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

import amazon from "../../../assets/brands/amazon.png";
import amazonVec from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import starPeople from "../../../assets/brands/start_people.png";

const brandLogos = [
  amazon,
  amazonVec,
  casio,
  moonstar,
  randstad,
  star,
  starPeople,
];

const Brands = () => {
  return (
    <Swiper
      slidesPerView={5}
      autoplay={{
        delay: 1200,
      }}
      loop={true}
      modules={[Autoplay, EffectCreative]}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
