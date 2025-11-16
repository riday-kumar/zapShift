import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImgOne from "../../../assets/banner/banner1.png";
import bannerImgTwo from "../../../assets/banner/banner2.png";
import bannerImgThree from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div>
        <img src={bannerImgOne} />
      </div>
      <div>
        <img src={bannerImgTwo} />
      </div>
      <div>
        <img src={bannerImgThree} />
      </div>
    </Carousel>
  );
};

export default Banner;
