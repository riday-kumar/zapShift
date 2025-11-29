import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h1>Payment Canceled</h1>
      <Link to="dashboard/my-parcels"></Link>
    </div>
  );
};

export default PaymentCancel;
