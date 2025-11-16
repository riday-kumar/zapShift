import React from "react";

import ServiceOne from "./ServiceOne";

const OurServices = () => {
  return (
    <div className="bg-secondary px-10 py-20 rounded-lg">
      {/* heading */}
      <div className="mb-10">
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
        <ServiceOne heading="Express & Standard Delivery"></ServiceOne>
        <ServiceOne heading="Nationwide  Delivery"></ServiceOne>
        <ServiceOne heading="Fulfillment Solution"></ServiceOne>
        <ServiceOne heading="Cash On Home  Delivery"></ServiceOne>
        <ServiceOne heading="Corporate Service"></ServiceOne>
        <ServiceOne heading="Parcel Return"></ServiceOne>
      </div>
    </div>
  );
};

export default OurServices;
