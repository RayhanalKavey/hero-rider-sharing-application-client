import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const RiderRoute = ({ children }) => {
  //LoggedIn user email
  const { email } = useSelector((state) => state?.auth);
  // get all users from the database
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();

  // Find if the user Registered as employer otherwise send to the employer Registration page
  const isAdmin = data?.find((u) => u?.email === email && u?.isAdmin === true);
  // Find if the user Registered as employer otherwise send to the employer Registration page
  const isRider = data?.find((u) => u?.email === email && u?.isRider === true);
  // Find if the user Registered as employer otherwise send to the employer Registration page
  const isLearner = data?.find(
    (u) => u?.email === email && u?.isLearder === true
  );
  const location = useLocation();
  if (isLoading) {
    return <div>loading............</div>;
  }
  if (email && !isAdmin && !isLearner && isRider) {
    return children;
  }
  if (email && isAdmin && !isLearner && !isRider) {
    toast.error("You are an Admin...", { id: "rider" });
    return (
      <Navigate
        to="/admin-dashboard"
        state={{ from: location }}
        replace
      ></Navigate>
    );
  }
  if (email && !isAdmin && !isRider && isLearner) {
    toast.error("You are a Learner", { id: "rider" });
    return (
      <Navigate
        to="/learner-dashboard"
        state={{ from: location }}
        replace
      ></Navigate>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default RiderRoute;
