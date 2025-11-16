import React from "react";
import service from "../../../assets/service.png";
import ServiceOne from "./ServiceOne";

const OurServices = () => {
  return (
    <div className="bg-secondary p-10">
      {/* heading */}
      <div className="mb-5">
        <p className="text-[40px] text-center font-extrabold text-white">
          Our Services
        </p>
        <p className="text-center text-[#dadada]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      {/* services */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        <ServiceOne heading="Express and Standard  Delivery">
          Express and kiop
        </ServiceOne>
        <ServiceOne heading="Express and Standard  Delivery">
          Express and kiop
        </ServiceOne>
        <ServiceOne heading="Express and Standard  Delivery">
          Express and kiop
        </ServiceOne>
      </div>
    </div>
  );
};

export default OurServices;
