import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../App";

export default function RequireAuthAdmin({ children }) {
  let auth = useAuth();
  let location = useLocation();
  
  if (!auth.user || !auth.user.roles.some(role => role === "ROLE_ADMIN")) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}