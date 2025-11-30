import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const authInfo = useAuth();

  const axiosSecure = useAxiosSecure();

  //   console.log(authInfo);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", authInfo.currentUser.email], // cash name is 'payments'
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${authInfo.currentUser.email}`
      );
      return res.data;
    },
  });

  console.log(payments);

  return (
    <div>
      <h2 className="text-5xl">Payment History:{payments.length} </h2>

      <div className="overflow-x-auto my-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Parcel Id</th>
              <th>Parcel Name</th>
              <th>Parcel Amount</th>
              <th>Transaction Id</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.parcelId}</td>
                <td>{payment.parcelName}</td>
                <td>{payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.paidAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
