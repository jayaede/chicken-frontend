import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ token, role, allowedRole, children }) => {
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role does not match allowedRole, redirect to login
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the children (protected page)
  return children;
};

export default PrivateRoute;
