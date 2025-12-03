import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${currentUser?.email}/role`);
      return res.data;
    },
  });

  return { role, roleLoading };
};

export default useRole;
