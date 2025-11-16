import React from "react";
import servicePng from "../../../assets/service.png";
const ServiceOne = ({ heading }) => {
  return (
    <div className="bg-white text-center rounded-lg p-8 space-y-2">
      <img
        className="mx-auto p-6 bg-linear-to-b from-[#eeedfc] to-[#eeedfc00] rounded-full"
        src={servicePng}
        alt=""
      />

      <h1 className="text-2xl font-bold">{heading}</h1>
      <p className="text-[16px] font-medium text-justify text-base-200">
        We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
        Khulna and Rajshahi. Express delivery available in Dhaka within 4-6
        hours from pick up to drop off
      </p>
    </div>
  );
};

export default ServiceOne;
