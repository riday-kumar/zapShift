import React from "react";
import Banner from "../Banner/Banner";
import HowWork from "../HowWork/HowWork";
import OurServices from "../OurServices/OurServices";

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner></Banner>
      <HowWork></HowWork>
      <OurServices></OurServices>
    </div>
  );
};

export default Home;
