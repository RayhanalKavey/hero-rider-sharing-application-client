import React from "react";
import { useGetUserInfoQuery } from "../../../features/auth/authApi";

const AllUser = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery();
  console.log("All user from all user", data);
  console.log("current date from all user", new Date());
  // const currentDate = new Date();
  return (
    <div>
      all useer
      {data?.map((user) => (
        <div
          className="bg-white border border-gray-300 rounded p-4"
          key={user?._id}
        >
          <p className="text-gray-800">{user?.fullName}</p>
          <p className="text-gray-800">{user?.age}</p>
          {/* <p className="text-gray-800">{currentDate}</p> */}
        </div>
      ))}
    </div>
  );
};

export default AllUser;
