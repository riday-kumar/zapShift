import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-end gap-3">
      <img src={logo} alt="" />{" "}
      <p className="font-bold text-3xl -ms-2.5">zapShift</p>
    </div>
  );
};

export default Logo;
