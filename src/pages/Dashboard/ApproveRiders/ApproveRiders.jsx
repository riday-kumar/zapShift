import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.riderEmail,
    };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Yes, ${status} it!`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Success!",
              text: `Rider status is set to ${status}`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  return (
    <div>
      <p>approve riders {riders.length}</p>
      <div className="overflow-x-auto my-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Rider Name</th>
              <th>Driving License</th>
              <th>Status</th>
              <th>Work Status</th>
              <th>Rider Address</th>
              <th>Rider Email</th>
              <th>Rider Phone</th>
              <th>Rider Region</th>
              <th>Rider District</th>
              <th>Rider Nid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr key={index}>
                <td>{rider.riderName}</td>
                <td>{rider.drivingLicenseNum}</td>
                <td>{rider.status}</td>
                <td>{rider.workStatus}</td>
                <td>{rider.riderAddress}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderPhone}</td>
                <td>{rider.riderRegion}</td>
                <td>{rider.riderDistrict}</td>
                <td>{rider.nidNo}</td>
                <td>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button onClick={() => handleReject(rider)} className="btn">
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button className="btn">
                    <FaTrash></FaTrash>
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

export default ApproveRiders;
