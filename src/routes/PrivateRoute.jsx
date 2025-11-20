import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
