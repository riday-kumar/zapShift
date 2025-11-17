import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import { PiQuotesFill } from "react-icons/pi";

const Reviews = ({ reviewPromise }) => {
  const reviewData = use(reviewPromise);

  return (
    <div>
      <Swiper
        slidesPerView={3}
        autoplay={{
          delay: 2000,
        }}
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        modules={[Autoplay, EffectCoverflow]}
        className="mySwiper"
      >
        {reviewData.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white min-h-60 space-y-2 px-5 flex flex-col justify-center rounded-lg">
              <PiQuotesFill className="text-4xl" />
              <p>{data.review}</p>
              <hr className="border-dotted" />
              <div className="flex items-center gap-5">
                <img
                  className="h-13 w-13 rounded-full"
                  src={data.user_photoURL}
                  alt=""
                />
                <div>
                  <p className="font-bold ">{data.userName}</p>
                  <p>{data.review}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
