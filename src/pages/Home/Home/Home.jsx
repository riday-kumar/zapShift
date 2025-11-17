import React from "react";
import Banner from "../Banner/Banner";
import HowWork from "../HowWork/HowWork";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";

const reviewPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner></Banner>
      <HowWork></HowWork>
      <OurServices></OurServices>
      <Brands></Brands>
      <Reviews reviewPromise={reviewPromise}></Reviews>
    </div>
  );
};

export default Home;
