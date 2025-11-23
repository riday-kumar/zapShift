import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${currentUser.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <p>all of my parcels : {parcels.length}</p>
    </div>
  );
};

export default MyParcels;
