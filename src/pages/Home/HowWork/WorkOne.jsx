import React from "react";
import bookingIcon from "../../../assets/bookingIcon.png";

const WorkOne = ({ heading }) => {
  return (
    <div className="bg-white rounded-xl space-y-1 p-10">
      <img src={bookingIcon} alt="" />
      <p
        className="text-[20px] font-bold text-secondary capitalize truncate tooltip"
        data-tip="testing"
      >
        {heading}
      </p>
      <p className="text-[16px] text-[#606060] font-medium">
        From personal packages to business shipments — we deliver on time, every
        time.
      </p>
    </div>
  );
};

export default WorkOne;
