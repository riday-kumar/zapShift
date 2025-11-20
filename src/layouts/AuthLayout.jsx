import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="p-3 max-w-7xl mx-auto ">
      <Logo></Logo>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <div className="grid lg:grid-cols-2 items-center">
          {/* dynamic content */}
          <Outlet></Outlet>
          {/* fixed image */}
          <div>
            <img src={authImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
