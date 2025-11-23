import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <div className="flex items-end gap-3">
      <img src={logo} alt="" />{" "}
      <p className="font-bold text-3xl -ms-2.5">zapShift</p>
    </div>
  );
};

export default Logo;
