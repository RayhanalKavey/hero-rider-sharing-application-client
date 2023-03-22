import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const AdminDashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <ul className="menu p-4">
      <li className="mb-4">
        <Link to="" className="hover:text-blue-500">
          All User
        </Link>
      </li>
    </ul>
  );
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden lg:block bg-gray-900 text-gray-100 w-64 min-h-screen">
          {links}
        </div>
        <div className="w-full h-full bg-white flex-1 ">
          <Outlet />
          <div className="relative lg:hidden">
            <button
              className=" fixed bottom-4 right-4 z-50 text-gray-100 "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen && "Close drawer"}
            </button>
            <button
              className=" fixed bottom-4 right-4 z-50 "
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen || "Open drawer"}
            </button>

            <div
              className={`fixed top-0 right-0 w-2/5 h-full bg-gray-900 text-gray-100 z-40 transition-all duration-300 transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {links}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
