import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEye, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // using tanstack query
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${currentUser.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // when user confirm that he will  agree to delete

        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch(); // refresh the data in the UI

            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel Request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <p>all of my parcels : {parcels.length}</p>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Tracking Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <Link
                      to={`/dashboard/payment/${parcel._id}`}
                      className="btn btn-sm 
                    text-black btn-primary"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>{parcel?.deliveryStatus}</td>
                <td>{parcel?.trackingId}</td>
                <td className="space-x-2">
                  <button className="btn btn-square btn-sm btn-warning">
                    <FaEye />
                  </button>
                  <button className="btn btn-square btn-sm btn-warning">
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square btn-sm btn-error"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
