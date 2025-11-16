import React from "react";
import WorkOne from "./WorkOne";
const HowWork = () => {
  return (
    <div>
      <h3 className="text-3xl mb-5 font-extrabold">How it Works</h3>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7 ">
        <WorkOne heading="Booking Pick & Drop"></WorkOne>
        <WorkOne heading="Cash On Delivery"></WorkOne>
        <WorkOne heading="Delivery Hub"></WorkOne>
        <WorkOne heading="Booking SME & Corporate"></WorkOne>
      </div>
    </div>
  );
};

export default HowWork;
