import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const authInfo = useAuth();

  useEffect(() => {
    // intercept request
    axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${authInfo.currentUser?.accessToken}`;
      return config;
    });
  }, [authInfo.currentUser?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
