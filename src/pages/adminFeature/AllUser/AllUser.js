import React from "react";
import { useGetUserQuery } from "../../../features/auth/authApi";

const AllUser = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  console.log("All user from all user", data);
  return <div>all useer</div>;
};

export default AllUser;
